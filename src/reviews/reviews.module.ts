import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsRepository } from './reviews.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { EmployeesModule } from 'src/employees/employees.module';
import { InterviewsModule } from 'src/interviews/interviews.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    EmployeesModule,
    InterviewsModule,
  ],
  providers: [ReviewsService, ReviewsResolver, ReviewsRepository],
})
export class ReviewsModule {}
