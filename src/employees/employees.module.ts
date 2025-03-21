import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { EmployeesService } from './employees.service';
import { EmployeeRepository } from './employees.repository';
import { EmployeesResolver } from './employees.resolver';
import { DepartmentsModule } from 'src/departments/departments.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DepartmentsModule,
    AuthModule,
    TokensModule,
    EmailModule,
  ],
  providers: [EmployeesService, EmployeeRepository, EmployeesResolver],
  exports: [EmployeesService],
})
export class EmployeesModule {}
