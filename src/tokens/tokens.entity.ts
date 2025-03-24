import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee } from 'src/employees/employees.entity';
import { Candidate } from 'src/candidates/candidate.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class Tokens {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  token: string;
  

  @Field(() => Candidate, { nullable: true })
  @OneToOne(() => Candidate, (candidate) => candidate.token, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'candidateId' })
  candidate: Candidate | null;

  @Field(() => Employee, { nullable: true })
  @OneToOne(() => Employee, (employee) => employee.token, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee | null;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiryDate: Date;
}
