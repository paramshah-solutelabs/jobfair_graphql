import { Injectable } from '@nestjs/common';
import { InterviewRepository } from './interviews.repository';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { Interview } from './interviews.entity';

@Injectable()
export class InterviewsService {
  constructor(private interviewRepository: InterviewRepository) {}

  async createinterview(
    createinterviewData: CreateInterviewDto,
  ): Promise<Interview> {
    return this.interviewRepository.createInterview(createinterviewData);
  }

  async getInterviewById(id: string) {
    return this.interviewRepository.getInterviewById(id);
  }
}
