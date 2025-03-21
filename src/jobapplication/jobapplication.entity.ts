import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Position } from 'src/positions/positions.entity';
import { ApplicationStatus } from './enums/job-application.status.enum';
import { Interview } from 'src/interviews/interviews.entity';

@ObjectType()
@Entity()
export class JobApplication {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  application_date: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  resume_url: string;

  @Field(() => Position)
  @ManyToOne(() => Position, (position) => position.jobapplications, {
    eager: true,
  })
  position: Position;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_letter_url: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  has_reviewed: boolean;

  @Field({ nullable: true })
  @Column({ type: 'int', nullable: true })
  expected_salary: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  referral_source: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  internal_notes: string;

  @Field(() => ApplicationStatus)
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.NEW,
  })
  status: ApplicationStatus;

  @Field(() => [Interview], { nullable: true })
  @OneToMany(() => Interview, (interview) => interview.application, {
    eager: false,
  })
  interview: Interview[];
}
