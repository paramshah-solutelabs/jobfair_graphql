import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { EmailModule } from './../../src/email/email.module';
import { WebhookService } from './webhook.service';
import { TokensModule } from './../../src/tokens/tokens.module';
import { CandidatesModule } from './../../src/candidates/candidates.module';
import { PositionsModule } from './../../src/positions/positions.module';

@Module({
  imports:[EmailModule,TokensModule,CandidatesModule,PositionsModule],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
