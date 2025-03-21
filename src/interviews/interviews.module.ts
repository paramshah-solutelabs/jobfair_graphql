import { Module } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewsResolver } from './interviews.resolver';
import { EmployeesModule } from 'src/employees/employees.module';
import { JobapplicationModule } from 'src/jobapplication/jobapplication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interviews.entity';
import { InterviewRepository } from './interviews.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interview]),
    EmployeesModule,
    JobapplicationModule,
  ],
  providers: [InterviewsService, InterviewsResolver, InterviewRepository],
  exports: [InterviewsService],
})
export class InterviewsModule {}
