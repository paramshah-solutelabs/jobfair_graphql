import { InputType, Field } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { MeetingType } from '../enums/meetingType.enum';
import { MeetingStatus } from '../enums/meetingStatus.enum';

@InputType()
export class updateInterviewDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  scheduled_start_time?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  scheduled_end_time?: string;

  @Field(() => MeetingType, { nullable: true })
  @IsOptional()
  @IsEnum(MeetingType)
  @IsNotEmpty()
  type?: MeetingType;

  @Field(() => MeetingStatus, { nullable: true })
  @IsOptional()
  @IsEnum(MeetingStatus)
  @IsNotEmpty()
  status?: MeetingStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  round?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  meeting_link?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  employeeId?: string;
}
