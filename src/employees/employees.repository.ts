import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Auth, Repository } from 'typeorm';
import { DepartmentsService } from './../../src/departments/departments.service';
import { v4 as uuid } from 'uuid';
import { InviteEmployeeDto } from './dto/invite-employee.dto';
import { TokensService } from './../../src/tokens/tokens.service';
import { EmailService } from './../../src/email/email.service';
import { EmployeeStatus } from './enums/employment-status.enum';
import * as bcrypt from 'bcryptjs';
import { AuthResponse } from './../../src/candidates/dto/auth-response.dto';
import { LoginUserDto } from './../../src/candidates/dto/login-candidate.dto';
import { JwtService } from '@nestjs/jwt';
import { InviteResponse } from './dto/invite-sent.dto';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private departmentService: DepartmentsService,
    private tokenService: TokensService,
    private jwtService:JwtService,
    private emailService: EmailService,
  ) {}

  async createEmployee(
    createEmployeeData: CreateEmployeeDto,
  ): Promise<Employee> {
    const createEmployee = this.employeeRepository.create(createEmployeeData);
    const department = await this.departmentService.getDepartmentById(
      createEmployeeData.department_id,
    );
    createEmployee.department = department;
    return await this.employeeRepository.save(createEmployee);
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });
    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }

  async inviteEmployee(inviteEmployeeData: InviteEmployeeDto):Promise<InviteResponse> {
    const employee = await this.employeeRepository.findOne({
      where: { email: inviteEmployeeData.email },
    });
    if (!employee) {
      throw new NotFoundException();
    }
    const token = uuid();
    await this.tokenService.createToken(employee, token);
    await this.emailService.sendDynamicEmail(
      'employee',
      employee.first_name,
      inviteEmployeeData.email,
      token,
      inviteEmployeeData.role,
    );
    employee.employment_status = EmployeeStatus.Invited;
    await this.employeeRepository.save(employee);
    return {message:'Employee invitation sent'};
  }

  async setEmployeePassword(
    token: string,
    password: string,
  ): Promise<Employee> {
    const validateToken = await this.tokenService.validateToken(token);
    if (!validateToken.employee) {
      throw new NotFoundException();
    }
    const employee = await this.employeeRepository.findOne({
      where: { id: validateToken.employee.id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const encyptedPassword = await bcrypt.hash(password, 10);
    employee.password = encyptedPassword;
    await this.employeeRepository.save(employee);
    await this.tokenService.deleteToken(validateToken.id);
    return employee;
  }

  async loginEmployee(loginEmployeeData:LoginUserDto):Promise<AuthResponse>{
      const employee=await this.employeeRepository.findOne({where:{email:loginEmployeeData.email}});
      if(!employee){
        throw new NotFoundException();
      }
      const isPasswordValid = await bcrypt.compare(
            loginEmployeeData.password,
            employee.password,
      );
      if(!isPasswordValid){
        throw new UnauthorizedException("Invalid credentials");
      }
      const payload = { id: employee.id, email: employee.email };
      const jwtToken = await this.jwtService.sign(payload);
      return {access_token:jwtToken}
    }

    async forgotPassword(email:string):Promise<InviteResponse>{
      const employee = await this.employeeRepository.findOne({where:{email}});
      if(!employee || !employee.password){
        throw new NotFoundException("Something went wrong")
      }
      const token = uuid();
      await this.tokenService.createToken(employee,token);
      await this.emailService.forgotPassword(
        employee.first_name,
        email,
        token
      )
      return {message:'We have sent an email to reset your password'}

   }

   async employeePasswordReset(password:string,token:string):Promise<Employee>{
      if(!password){
        throw new BadRequestException();
      }
      const validateToken=await this.tokenService.validateToken(token);
      if(!validateToken.employee){
        throw new BadRequestException();
      }
      const employee=await this.employeeRepository.findOne({where:{id:validateToken.employee.id}});
      if(!employee){
        throw new NotFoundException()
      }
      const encryptedPassword=await bcrypt.hash(password,10)
      employee.password=encryptedPassword;
      await this.employeeRepository.save(employee);
      await this.tokenService.deleteToken(validateToken.id);
      return employee;
   }
}
