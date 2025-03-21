import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { InterviewsService } from 'src/interviews/interviews.service';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private employeeService: EmployeesService,
    private interviewService: InterviewsService,
  ) {}

  async createReview(createReviewData: CreateReviewDto): Promise<Review> {
    const createReview = await this.reviewRepository.create(createReviewData);
    const interview = await this.interviewService.getInterviewById(
      createReviewData.interviewId,
    );
    const employee = await this.employeeService.getEmployeeById(
      createReviewData.employeeId,
    );
    createReview.interview = interview;
    createReview.employee = employee;
    return await this.reviewRepository.save(createReview);
  }

  async getReviewById(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException();
    }
    return review;
  }
}
