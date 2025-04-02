import { Resolver, Mutation, Args } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { Controller,Post, UnauthorizedException , Body } from '@nestjs/common';
import { EmployeesService } from './../../src/employees/employees.service';
import { CandidatesService } from './../../src/candidates/candidates.service';


@Controller('auth')
export class AuthController {
    constructor(
        private employeeService:EmployeesService,
        private candidateService:CandidatesService
    ){}

    @Post("/login")
    async employeeLogin(
      @Body() body: { input: { email: string; password: string } }
    ): Promise<{ access_token: string }> {
      const { email, password } = body.input;
    
      return await this.employeeService.loginEmployee({ email, password });
  }

    @Post("/candidateLogin")
    async candidateLogin(
      @Body() body: { input: { email: string; password: string } }
    ){
      console.log(body);
      const {email,password}=body.input;
      return await this.candidateService.loginCandidate({email,password})
    }
  
}
    