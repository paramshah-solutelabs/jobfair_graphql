import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmployeeType } from '../enums/employee-type.enum';

@InputType()
export class InviteEmployeeDto {
  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field(() => EmployeeType)
  @IsNotEmpty({ message: 'Role is required' })
  @IsString()
  role: EmployeeType;
}