import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EmployeeStatus } from './enums/employment-status.enum';
import { EmployeeType } from './enums/employee-type.enum';
import { Department } from './../../src/departments/departments.entity';
import { Interview } from './../../src/interviews/interviews.entity';
import { Review } from './../../src/reviews/reviews.entity';
import { Tokens } from './../../src/tokens/tokens.entity';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Department)
  @ManyToOne(() => Department, (dep) => dep.employees, { eager: true })
  department: Department;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  role: string;

  @Field(() => EmployeeType, { nullable: true })
  @Column({ type: 'enum', enum: EmployeeType, default: null })
  type: EmployeeType | null;

  @Field()
  @Column({ type: 'date' })
  hire_date: string;

  @Field(() => EmployeeStatus)
  @Column({ type: 'enum', enum: EmployeeStatus })
  employment_status: EmployeeStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field()
  @CreateDateColumn()
  created_At: Date;

  @Field()
  @UpdateDateColumn()
  updated_At: Date;

  @Field()
  @Column()
  is_Active: boolean;

  @Field(() => [Interview], { nullable: true })
  @OneToMany(() => Interview, (interview) => interview.employee, {
    eager: false,
  })
  interviews: Interview[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.employee, { eager: false })
  reviews: Review[];

  @Field(() => Tokens, { nullable: true })
  @OneToOne(() => Tokens, (token) => token.employee)
  token: Tokens | null;

  //   @Field(() => [Interview], { nullable: true })
  //   @OneToMany(() => Interview, (interview) => interview.employee, { eager: false })
  //   interviews: Interview[];

  //   @Field(() => Tokens, { nullable: true })
  //   @OneToOne(() => Tokens, (token) => token.employee, { nullable: true })
  //   token: Tokens | null;
}
