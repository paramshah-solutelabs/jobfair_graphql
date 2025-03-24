import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './jobapplication.entity';
import { JobapplicationService } from './jobapplication.service';
import { JobApplicationRepository } from './jobapplication.repository';
import { JobapplicationResolver } from './jobapplication.resolver';
import { PositionsModule } from './../../src/positions/positions.module';
import { CandidatesModule } from './../../src/candidates/candidates.module';
import { EmailModule } from './../../src/email/email.module';
import { TokensModule } from './../../src/tokens/tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplication]),
    PositionsModule,
    CandidatesModule,
    EmailModule,
    TokensModule,
  ],
  providers: [
    JobapplicationService,
    JobApplicationRepository,
    JobapplicationResolver,
  ],
  exports: [JobapplicationService],
})
export class JobapplicationModule {}
