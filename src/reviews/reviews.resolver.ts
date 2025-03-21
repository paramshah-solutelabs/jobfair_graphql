import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Review } from './reviews.entity';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private reviewService: ReviewsService) {}

  @Mutation(() => Review)
  async createReview(@Args('data') data: CreateReviewDto) {
    return await this.reviewService.createReview(data);
  }
}
