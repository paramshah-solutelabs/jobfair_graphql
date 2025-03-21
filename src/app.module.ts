import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { JobapplicationModule } from './jobapplication/jobapplication.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ModulesContainer } from '@nestjs/core';
import { join } from 'path';
import { CandidatesModule } from './candidates/candidates.module';
import { EmployeesModule } from './employees/employees.module';
import { InterviewsModule } from './interviews/interviews.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      driver: ApolloDriver,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://employees_sgp1_user:w48umRsEl4XFabAPw5RSCoDIbajgtsdp@dpg-cvbr76aj1k6c73e189f0-a.oregon-postgres.render.com/employees_sgp1',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    DepartmentsModule,
    PositionsModule,
    JobapplicationModule,
    CandidatesModule,
    EmployeesModule,
    InterviewsModule,
    ReviewsModule,
    AuthModule,
    EmailModule,
    TokensModule,
  ],
  controllers: [],
  providers: [ModulesContainer],
})
export class AppModule {}
