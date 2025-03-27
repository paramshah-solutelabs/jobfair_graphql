import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Position } from './../../src/positions/positions.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from './../../src/employees/employees.entity';

@ObjectType()
@Entity()
export class Department {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Employee], { nullable: true })
  @OneToMany(() => Employee, (emp) => emp.department, { eager: false })
  employees: Employee[];

  @Field(() => [Position], { nullable: true })
  @OneToMany(() => Position, (pos) => pos.department, { eager: false })
  positions: Position[];
}
