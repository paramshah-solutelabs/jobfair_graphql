import { DataSource } from 'typeorm';
import { Department } from './departments/departments.entity';
import { Position } from './positions/positions.entity';
import { JobApplication } from './jobapplication/jobapplication.entity';
import { Candidate } from './candidates/candidate.entity';
import { Employee } from './employees/employees.entity';
import { Interview } from './interviews/interviews.entity';
import { Review } from './reviews/reviews.entity';
import { Tokens } from './tokens/tokens.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://postgres:postgres@postgres:5432/jobfair',
  // url:`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  entities: [
    Department,
    Position,
    JobApplication,
    Candidate,
    Employee,
    Interview,
    Review,
    Tokens,
  ],
  migrations: ['./src/migrations/*.{js,ts}'],
  synchronize: false,
});
