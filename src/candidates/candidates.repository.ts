import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './candidate.entity';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { SetCandidateDto } from './dto/setCandidate.dto';
import * as bcrypt from 'bcryptjs';
import { Status } from './enums/candidate-status.enum';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginUserDto } from './dto/login-candidate.dto';

@Injectable()
export class CandidatesRepository {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepo: Repository<Candidate>,
    private tokenService: TokensService,
    private jwtService: JwtService,
  ) {}

  async createCandidate(createCandidateData: CreateCandidateDto) {
    const createCandidate = this.candidateRepo.create(createCandidateData);
    return await this.candidateRepo.save(createCandidate);
  }

  async registerCandidate(
    registerCandidateData: SetCandidateDto,
    token: string,
  ): Promise<Candidate> {
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

    const payload = { id: candidate.id, email: candidate.email };
    console.log(payload);
    const jwtToken = await this.jwtService.sign(payload);
    console.log(jwtToken);
    return { access_token: jwtToken };
  }

  async getCandidateById(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepo.findOne({ where: { id } });
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
