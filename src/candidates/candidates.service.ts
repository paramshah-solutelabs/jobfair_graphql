import { Injectable } from '@nestjs/common';
import { CandidatesRepository } from './candidates.repository';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './candidate.entity';
import { SetCandidateDto } from './dto/setCandidate.dto';
import { LoginUserDto } from './dto/login-candidate.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { InviteResponse } from './../../src/employees/dto/invite-sent.dto';

@Injectable()
export class CandidatesService {
  constructor(private candidateRepo: CandidatesRepository) {}

  async createCandidate(createCandidateData: CreateCandidateDto) {
    return await this.candidateRepo.createCandidate(createCandidateData);
  }

  async getCandidateById(id: string): Promise<Candidate> {
    return await this.candidateRepo.getCandidateById(id);
  }

  async createCandidateWithApplication(email: string) {
    return await this.candidateRepo.createCandidateWithApplication(email);
  }

  async forgotPassword(email:string):Promise<InviteResponse>{
    return await this.candidateRepo.forgotPassword(email)
  }

  async resetPassword(password:string,token:string):Promise<Candidate>{
    return await this.candidateRepo.candidateResetPassword(password,token);
  }


  async registerCandidate(
    setCandidateData: SetCandidateDto,
    token: string,
  ): Promise<Candidate> {
    return await this.candidateRepo.registerCandidate(setCandidateData, token);
  }

  async loginCandidate(
    loginCandidateData: LoginUserDto,
  ): Promise<AuthResponse> {
    return await this.candidateRepo.candidateLogin(loginCandidateData);
  }

}
