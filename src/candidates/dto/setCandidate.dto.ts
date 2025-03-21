import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../enums/candidate-status.enum';

@InputType()
export class SetCandidateDto {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  first_name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @Field()
  @Matches(/^[1-9]{1}[0-9]{9}$/, {
    message: 'Phone number must be 10 digits and not start with 0',
  })
  @IsNotEmpty()
  phone: string;

  @Field({ nullable: true })
  @IsOptional()
  linkedIn_url?: string;

  @Field({ nullable: true })
  @IsOptional()
  current_company?: string;

  @Field({ nullable: true })
  @IsOptional()
  current_position?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  source?: string;

  @Field(() => Status, { nullable: true })
  @IsOptional()
  @IsEnum(Status, {
    message:
      'Status must be one of the following values: "active", "inactive", "blocklisted"',
  })
  status?: Status;

  @Field({ nullable: true })
  @MinLength(10)
  @MaxLength(2000)
  @IsOptional()
  notes?: string;
}
