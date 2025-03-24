import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Department } from './../../src/departments/departments.entity';
import { JobApplication } from './../../src/jobapplication/jobapplication.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @ManyToOne(() => Department, (dept) => dept.positions, { eager: true })
  @Field(() => Department)
  department: Department;

  @OneToMany(
    () => JobApplication,
    (jobapplication) => jobapplication.position,
    { eager: false },
  )
  @Field(() => [JobApplication], { nullable: true })
  jobapplications: JobApplication[];

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  requirements: string;

  @Column()
  @Field()
  position_type: string;

  @Column()
  @Field()
  experience_level: string;

  @Column()
  @Field()
  salary_min: number;

  @Column()
  @Field()
  salary_max: number;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  posted_date: string;

  @Column()
  @Field()
  closing_date: string;

  @Column()
  @Field()
  openings: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @Column()
  @Field()
  is_remote: boolean;
}
