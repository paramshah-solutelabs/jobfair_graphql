import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';
  import { Position } from 'src/positions/positions.entity';  
  //   import { Employee } from 'src/employee/employee.entity';

  @Entity()
  export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column({ default: true })
    isActive: boolean;
  
    // @OneToMany(() => Employee, (emp) => emp.department, { eager: false })
    // employees: Employee[];
  
    @OneToMany(() => Position, (pos) => pos.department, { eager: false })
    positions: Position[];
  }
  