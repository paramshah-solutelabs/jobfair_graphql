import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { MeetingType } from './enums/meetingType.enum';
import { MeetingStatus } from './enums/meetingStatus.enum';
import { Employee } from './../../src/employees/employees.entity';
import { JobApplication } from './../../src/jobapplication/jobapplication.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Review } from './../../src/reviews/reviews.entity';

@ObjectType()
@Entity()
export class Interview {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => JobApplication)
  @ManyToOne(() => JobApplication, (application) => application.interview, {
    eager: true,
  })
  @JoinColumn()
  application: JobApplication;

  @Field(() => Employee)
  @ManyToOne(() => Employee, (employee) => employee.interviews, { eager: true })
  employee: Employee;

  @Field()
  @Column({ type: 'date' })
  date: string;

  @Field()
  @Column({ type: 'time' })
  scheduled_start_time: string;

  @Field()
  @Column({ type: 'time' })
  scheduled_end_time: string;

  @Field(() => MeetingType)
  @Column({ type: 'enum', enum: MeetingType })
  type: MeetingType;

  @Field(() => MeetingStatus)
  @Column({ type: 'enum', enum: MeetingStatus })
  status: MeetingStatus;

  @Field(() => Int)
  @Column()
  round: number;

  @Field()
  @Column()
  meeting_link: string;

  @Field()
  @Column()
  notes: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.interview, { eager: false })
  reviews: Review[];
}
