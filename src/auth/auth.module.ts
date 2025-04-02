import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './../../src/candidates/candidate.entity';
import { Employee } from './../../src/employees/employees.entity';
import { AuthController } from './auth.controller';
import { forwardRef } from '@nestjs/common';
import { EmployeesModule } from './../../src/employees/employees.module';
import { CandidatesModule } from './../../src/candidates/candidates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Employee]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'a3f89c2b7d5e461fa8cbe2d0174f9a6ddf327b1c6e8a5c4f0d7e3b98a12f6c7d',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    forwardRef(() => EmployeesModule) ,
    forwardRef(()=>CandidatesModule)
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
