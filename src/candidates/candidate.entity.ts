import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Status } from './enums/candidate-status.enum';
import { Tokens } from './../../src/tokens/tokens.entity';
import { JobApplication } from './../../src/jobapplication/jobapplication.entity';

@ObjectType()
@Entity()
export class Candidate {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  first_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  last_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  resume_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  linkedIn_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  current_company: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  current_position: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  source: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  rejection_date: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => Status, { nullable: true })
  @Column({
    type: 'enum',
    enum: Status,
    nullable: true,
    default: Status.Inactive,
  })
  status: Status;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  notes: string;

  @Field(() => Tokens, { nullable: true })
  @OneToOne(() => Tokens, (token) => token.candidate)
  token: Tokens | null;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image_url: string;
}
