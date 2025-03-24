import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesResolver } from './candidates.resolver';
import { CandidatesRepository } from './candidates.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './candidate.entity';
import { PassportModule } from '@nestjs/passport';
import { TokensModule } from './../../src/tokens/tokens.module';
import { AuthModule } from './../../src/auth/auth.module';
import { EmailModule } from './../../src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    TokensModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmailModule
  ],
  providers: [CandidatesService, CandidatesResolver, CandidatesRepository],
  exports: [CandidatesService],
})
export class CandidatesModule {}
