import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ApplicationStatus } from '../enums/job-application.status.enum';

@InputType()
export class CreateJobApplicationDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUrl()
  resume_url: string;

  @Field(() => ApplicationStatus, { nullable: true })
  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus = ApplicationStatus.NEW;

  @Field({ nullable: true })
  @IsUUID()
  @IsNotEmpty()
  positionId: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  cover_letter_url?: string;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  expected_salary?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  referral_source?: string;
}
