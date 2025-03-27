import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Interview } from './interviews.entity';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => Interview)
export class InterviewsResolver {
  constructor(private interviewService: InterviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Mutation(() => Interview)
  async createInterview(@Args('data') data: CreateInterviewDto) {
    return this.interviewService.createinterview(data);
  }
}
