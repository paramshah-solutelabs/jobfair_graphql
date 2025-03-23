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
  url:process.env.DB_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
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
