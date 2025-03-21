import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { reviewStatus } from '../enums/review-status.enum';

@InputType()
export class CreateReviewDto {
  @Field()
  @IsString()
  interviewId: string;

  @Field()
  @IsString()
  employeeId: string;

  @Field()
  @IsString()
  review_text: string;

  @Field()
  @IsBoolean()
  is_Recommended: boolean;

  @Field()
  @IsNumber()
  technical_score: number;

  @Field()
  @IsNumber()
  communication_score: number;

  @Field()
  @IsDateString()
  review_date: string;

  @Field(() => reviewStatus)
  @IsEnum(reviewStatus)
  status: reviewStatus;
}
