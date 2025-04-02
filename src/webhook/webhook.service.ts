import { Injectable } from '@nestjs/common';
import { EmailService } from './../../src/email/email.service';
import { TokensService } from './../../src/tokens/tokens.service';
import { v4 as uuidv4 } from 'uuid';
import { CandidatesService } from './../../src/candidates/candidates.service';
import { PositionsService } from './../../src/positions/positions.service';

@Injectable()
export class WebhookService {
    constructor(
        private emailService:EmailService,
        private tokenService:TokensService,
        private candidateService:CandidatesService,
        private positionService:PositionsService
    ){}
    
    async createApplication(data){  
        const position = await this.positionService.getPositionById(
            data.positionId,
          );
          const createCandidate =
            await this.candidateService.createCandidateWithApplication(
              data.email,
            );
          const token = uuidv4();
          await this.tokenService.createToken(createCandidate, token);
          await this.emailService.sendDynamicEmail(
            'candidate',
            'candidate',
            data.email,
            token,
          );
          }
}
