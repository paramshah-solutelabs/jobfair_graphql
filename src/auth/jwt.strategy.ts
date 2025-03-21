import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from 'src/candidates/candidate.entity';
import { Employee } from 'src/employees/employees.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ironwoman890',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const candidate = await this.candidateRepository.findOne({
      where: { id: payload.id },
    });

    if (candidate) {
      return candidate;
    }

    const employee = await this.employeeRepository.findOne({
      where: { id: payload.id },
    });

    if (employee) {
      return employee;
    }

    throw new NotFoundException('User not found');
  }
}
