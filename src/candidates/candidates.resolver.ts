import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Candidate } from './candidate.entity';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Query } from '@nestjs/graphql';
import { SetCandidateDto } from './dto/setCandidate.dto';
import { Context } from '@nestjs/graphql';
import { LoginUserDto } from './dto/login-candidate.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { InviteResponse } from 'src/employees/dto/invite-sent.dto';

@Resolver(() => Candidate)
export class CandidatesResolver {
  constructor(private candidateService: CandidatesService) {}

  @Mutation(() => Candidate)
  async createCandidate(@Args('data') createCandidate: CreateCandidateDto) {
    return await this.candidateService.createCandidate(createCandidate);
  }

  @Query(() => Candidate)
  async getCandidateById(@Args('id') id: string) {
    return await this.candidateService.getCandidateById(id);
  }

  @Mutation(() => Candidate)
  async registerCandidate(
    @Args('registerCandidateData') registerCandidateData: SetCandidateDto,
    @Context() context: any,
  ): Promise<Candidate> {
    const token = context.req.headers.token;
    return this.candidateService.registerCandidate(
      registerCandidateData,
      token,
    );
  }

  @Mutation(() => AuthResponse)
  async candidateLogin(
    @Args('loginCandidateData') loginCandidateData: LoginUserDto,
  ) {
    return this.candidateService.loginCandidate(loginCandidateData);
  }

  @Mutation(() => InviteResponse)
  async candidateForgotPassword(
    @Args('email') email: string,
  ): Promise<InviteResponse> {
    return await this.candidateService.forgotPassword(email);
  }

  @Mutation(() => Candidate)
  async candidateResetPassword(
    @Args('password') password: string,
    @Context() context:any
  ): Promise<Candidate> { 
    const token = context.req.headers.token;
    return await this.candidateService.resetPassword(password, token);
  }


}
