import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { MeetingType } from '../enums/meetingType.enum';
import { MeetingStatus } from '../enums/meetingStatus.enum';

@InputType()
export class CreateInterviewDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  interviewId?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  scheduled_start_time: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  scheduled_end_time: string;

  @Field(() => MeetingType)
  @IsEnum(MeetingType)
  @IsNotEmpty()
  type: MeetingType;

  @Field(() => MeetingStatus)
  @IsEnum(MeetingStatus)
  @IsNotEmpty()
  status: MeetingStatus;

  @Field()
  @IsNotEmpty()
  @IsString()
  applicationId: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  round: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  meeting_link: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  notes: string;
}
