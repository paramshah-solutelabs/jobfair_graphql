import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { Review } from './reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewsRepository) {}

  async createReview(createReviewData: CreateReviewDto): Promise<Review> {
    return await this.reviewRepository.createReview(createReviewData);
  }

  async getReviewById(id: string): Promise<Review> {
    return await this.reviewRepository.getReviewById(id);
  }
}
