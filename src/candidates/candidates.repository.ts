import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './candidate.entity';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { TokensService } from './../../src/tokens/tokens.service';
import { SetCandidateDto } from './dto/setCandidate.dto';
import * as bcrypt from 'bcryptjs';
import { Status } from './enums/candidate-status.enum';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginUserDto } from './dto/login-candidate.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './../../src/email/email.service';
import { InviteResponse } from './../../src/employees/dto/invite-sent.dto';

@Injectable()
export class CandidatesRepository {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepo: Repository<Candidate>,
    private tokenService: TokensService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async createCandidate(createCandidateData: CreateCandidateDto) {
    const createCandidate = this.candidateRepo.create(createCandidateData);
    return await this.candidateRepo.save(createCandidate);
  }

  async registerCandidate(
    registerCandidateData: SetCandidateDto,
    token: string,
  ): Promise<Candidate> {
    console.log(registerCandidateData);
    console.log(token);
    const validateToken = await this.tokenService.validateToken(token);
    if (!validateToken.candidate) {
      throw new NotFoundException();
    }
    const candidate = await this.candidateRepo.findOne({
      where: { id: validateToken.candidate.id },
    });
    if (!candidate) {
      throw new NotFoundException();
    }
    const encryptedPassword = await bcrypt.hash(
      registerCandidateData.password,
      10,
    );
    Object.assign(candidate, registerCandidateData, {
      password: encryptedPassword,
      status: Status.Active,
    });

    await this.candidateRepo.save(candidate);
    await this.tokenService.deleteToken(validateToken.id);
    return candidate;
  }

  async candidateLogin(
    loginCandidateData: LoginUserDto,
  ): Promise<AuthResponse> {
    const candidate = await this.candidateRepo.findOne({
      where: { email: loginCandidateData.email },
    });
    if (!candidate) {
      throw new NotFoundException();
    }
    const isPasswordValid = await bcrypt.compare(
      loginCandidateData.password,
      candidate.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    // const payload = { id: candidate.id, email: candidate.email };
    const payload = {
      id: candidate.id,
      email: candidate.email,
      hasura_claims: {
        'x-hasura-user-id': candidate.id,
        'x-hasura-default-role': 'Candidate',
        'x-hasura-allowed-roles': ['Candidate'],
      },
    };
  
    const jwtToken = await this.jwtService.sign(payload);
    return { access_token: jwtToken };
  }

  async getCandidateById(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepo.findOne({ where: { id } });
    if (!candidate) {
      throw new NotFoundException();
    }
    return candidate;
  }

  async forgotPassword(email: string): Promise<InviteResponse> {
    const candidate = await this.candidateRepo.findOne({ where: { email } });

    if (!candidate || !candidate.password) {
      throw new NotFoundException();
    }
    const newToken = uuidv4();
    await this.tokenService.createToken(candidate, newToken);
    await this.emailService.forgotPassword('candidate', email, newToken);
    return { message: 'We have sent an email to reset your password' };
  }

  async candidateResetPassword(
    password: string,
    token: string,
  ): Promise<Candidate> {
    if (!password) {
      throw new BadRequestException('Enter password');
    }
    const validateToken = await this.tokenService.validateToken(token);
    if (!validateToken.candidate) {
      throw new BadRequestException();
    }
    const candidate = await this.candidateRepo.findOne({
      where: { id: validateToken.candidate.id },
    });
    if (!candidate) {
      throw new NotFoundException();
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    candidate.password = encryptedPassword;
    await this.candidateRepo.save(candidate);
    await this.tokenService.deleteToken(validateToken.id);
    return candidate;
  }

  async getCandidateByEmail(email: string): Promise<Candidate> {
    const candidate = await this.candidateRepo.findOne({ where: { email } });
    if (!candidate) {
      throw new NotFoundException();
    }
    return candidate;
  }

  async createCandidateWithApplication(email: string): Promise<Candidate> {
    let candidate = await this.candidateRepo.findOne({ where: { email } });

    if (!candidate) {
      candidate = this.candidateRepo.create({ email });
      candidate = await this.candidateRepo.save(candidate);
    }

    return candidate;
  }
}
