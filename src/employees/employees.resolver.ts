import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Employee } from './employees.entity';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InviteEmployeeDto } from './dto/invite-employee.dto';
import { Context } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { AuthResponse } from 'src/candidates/dto/auth-response.dto';
import { LoginUserDto } from 'src/candidates/dto/login-candidate.dto';
import { InviteResponse } from './dto/invite-sent.dto';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private employeeService: EmployeesService) {}

  @Mutation(() => Employee)
  async createEmployee(@Args('data') data: CreateEmployeeDto) {
    return await this.employeeService.createEmployee(data);
  }

  @Mutation(() => InviteResponse)
  async inviteEmployee(@Args('data') data: InviteEmployeeDto) {
    return await this.employeeService.inviteEmployee(data);
  }

  @Mutation(() => Employee)
  async setEmployeePassword(
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<Employee> {
    console.log(password);
    const token = context.req.headers.token;
    console.log(token)
    if (!token) {
      throw new NotFoundException();
    }
    return await this.employeeService.setEmployeePassword(token, password);
  }

  @Mutation(() => AuthResponse)
  async employeeLogin(
    @Args('data') data: LoginUserDto,
  ) {
    return this.employeeService.loginEmployee(data);
  }

}
