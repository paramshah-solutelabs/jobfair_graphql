import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employees.entity';
import { Repository } from 'typeorm';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { Interview } from './interviews.entity';
import { EmployeesService } from 'src/employees/employees.service';
import { JobapplicationService } from 'src/jobapplication/jobapplication.service';

@Injectable()
export class InterviewRepository {
  constructor(
    @InjectRepository(Interview)
    private InterviewRepository: Repository<Interview>,
    private employeeService: EmployeesService,
    private jobApplicationService: JobapplicationService,
  ) {}

  async createInterview(
    createInterviewData: CreateInterviewDto,
  ): Promise<Interview> {
    const employee = await this.employeeService.getEmployeeById(
      createInterviewData.employeeId,
    );
    const application = await this.jobApplicationService.getApplicationById(
      createInterviewData.applicationId,
    );
    const interview =
      await this.InterviewRepository.create(createInterviewData);
    interview.application = application;
    interview.employee = employee;
    return await this.InterviewRepository.save(interview);
  }

  async getInterviewById(id: string) {
    const interview = await this.InterviewRepository.findOne({ where: { id } });
    if (!interview) {
      throw new NotFoundException();
    }
    return interview;
  }
}
