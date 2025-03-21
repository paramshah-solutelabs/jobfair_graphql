import {
  IsBoolean,
  IsEmail,
  isEnum,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmployeeStatus } from '../enums/employment-status.enum';
import { EmployeeType } from '../enums/employee-type.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeDto {
  @Field()
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  first_name: string;

  @Field()
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  last_name: string;

  @Field(() => EmployeeType, { nullable: true })
  @IsOptional()
  @IsEnum(EmployeeType, { message: 'Invalid employee type' })
  type: EmployeeType | null;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  department_id: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^[1-9]{1}[0-9]{9}$/, {
    message: 'Phone number must be 10 digits and not start with 0',
  })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  role: string;

  @Field()
  @IsNotEmpty({ message: 'Hire date is required' })
  hire_date: string;

  @Field(() => EmployeeStatus)
  @IsEnum(EmployeeStatus, {
    message: 'Employment status must be one of: Fulltime, Parttime, Contract',
  })
  employment_status: EmployeeStatus;

  @Field()
  @IsBoolean({ message: 'is_Active must be a boolean' })
  is_Active: boolean;
}
