import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './../../src/candidates/candidate.entity';
import { Employee } from './../../src/employees/employees.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Employee]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ironwoman890',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
