import { Injectable } from '@nestjs/common';
import { JobApplicationRepository } from './jobapplication.repository';
import { CreateJobApplicationDto } from './dto/create-application.dto';
import { JobApplication } from './jobapplication.entity';

@Injectable()
export class JobapplicationService {
  constructor(private applicationRepository: JobApplicationRepository) {}

  async createApplication(
    data: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    return await this.applicationRepository.createApplication(data);
  }

  async getApplicationById(id: string) {
    return await this.applicationRepository.getApplicationById(id);
  }
}
