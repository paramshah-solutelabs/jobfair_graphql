import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class CreatePositionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  requirements: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  position_type: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  experience_level: string;

  @Field()
  @IsNumber()
  @Min(0)
  salary_min: number;

  @Field()
  @IsNumber()
  @Min(0)
  salary_max: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  location: string;

  @Field()
  @IsISO8601()
  @IsNotEmpty()
  posted_date: string;

  @Field()
  @IsISO8601()
  @IsNotEmpty()
  closing_date: string;

  @Field()
  @IsInt()
  @Min(1)
  openings: number;

  @Field()
  @IsBoolean()
  is_remote: boolean;

  @Field()
  @IsNotEmpty()
  @IsString()
  departmentId: string;
}
