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
  url: 'postgresql://employees_sgp1_user:w48umRsEl4XFabAPw5RSCoDIbajgtsdp@dpg-cvbr76aj1k6c73e189f0-a.oregon-postgres.render.com/employees_sgp1',
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
