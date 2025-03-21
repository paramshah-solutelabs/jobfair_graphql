import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createDepartmentDto {
  @Field()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  description: string;
}
