import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JobapplicationService } from './jobapplication.service';
import { JobApplication } from './jobapplication.entity';
import { CreateJobApplicationDto } from './dto/create-application.dto';

@Resolver(() => JobApplication)
export class JobapplicationResolver {
  constructor(private jobApplicationService: JobapplicationService) {}

  @Mutation(() => JobApplication)
  async createApplication(
    @Args('data') data: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    return await this.jobApplicationService.createApplication(data);
  }
}
