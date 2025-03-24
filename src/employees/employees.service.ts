import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employees.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employees.entity';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { InviteEmployeeDto } from './dto/invite-employee.dto';
import { AuthResponse } from './../../src/candidates/dto/auth-response.dto';
import { LoginUserDto } from './../../src/candidates/dto/login-candidate.dto';
import { InviteResponse } from './dto/invite-sent.dto';

@Injectable()
export class EmployeesService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(
    createEmployeeData: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeRepository.createEmployee(createEmployeeData);
  }

  async getEmployeeById(id: string): Promise<Employee> {
    return await this.employeeRepository.getEmployeeById(id);
  }


  async inviteEmployee(inviteEmployeeData: InviteEmployeeDto):Promise<InviteResponse> {
    return await this.employeeRepository.inviteEmployee(inviteEmployeeData);
  }

  async setEmployeePassword(
    token: string,
    password: string,
  ): Promise<Employee> {
    return await this.employeeRepository.setEmployeePassword(token, password);
  }

  async loginEmployee(loginEmployeeData:LoginUserDto):Promise<AuthResponse>{
    return await this.employeeRepository.loginEmployee(loginEmployeeData);
  }

  async forgotPassword(email:string){
    return await this.employeeRepository.forgotPassword(email);
  }

  async resetPassword(password:string,token:string):Promise<Employee>{
    return await this.employeeRepository.employeePasswordReset(password,token);
  }
}
