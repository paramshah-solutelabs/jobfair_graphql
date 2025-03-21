import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee } from 'src/employees/employees.entity';
import { Interview } from 'src/interviews/interviews.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { reviewStatus } from './enums/review-status.enum';

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Interview)
  @ManyToOne(() => Interview, (int) => int.reviews, { eager: true })
  interview: Interview;

  @Field(() => Employee)
  @ManyToOne(() => Employee, { eager: false })
  employee: Employee;

  @Field()
  @Column()
  review_text: string;

  @Field()
  @Column()
  is_Recommended: boolean;

  @Field()
  @Column()
  technical_score: number;

  @Field()
  @Column()
  communication_score: number;

  @Field()
  @Column({ type: 'date' })
  review_date: string;

  @Field(() => reviewStatus)
  @Column({ type: 'enum', enum: reviewStatus })
  status: reviewStatus;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
