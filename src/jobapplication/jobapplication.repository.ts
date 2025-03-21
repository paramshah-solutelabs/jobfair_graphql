import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from '@nestjs/graphql';
import { JobApplication } from './jobapplication.entity';
import { CreateJobApplicationDto } from './dto/create-application.dto';
import { PositionsService } from 'src/positions/positions.service';
import { CandidatesService } from 'src/candidates/candidates.service';
import { EmailService } from 'src/email/email.service';
import { v4 as uuidv4 } from 'uuid';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class JobApplicationRepository {
  constructor(
    @InjectRepository(JobApplication)
    private applicationRepo: Repository<JobApplication>,
    private positionService: PositionsService,
    private candidateService: CandidatesService,
    private emailService: EmailService,
    private toeknService: TokensService,
  ) {}

  async createApplication(
    createApplicationData: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const position = await this.positionService.getPositionById(
      createApplicationData.positionId,
    );
    const createCandidate =
      await this.candidateService.createCandidateWithApplication(
        createApplicationData.email,
      );
    console.log(createCandidate);
    const createApplication = this.applicationRepo.create(
      createApplicationData,
    );
    createApplication.position = position;
    const token = uuidv4();
    await this.toeknService.createToken(createCandidate, token);
    await this.emailService.sendDynamicEmail(
      'candidate',
      'candidate',
      createApplicationData.email,
      token,
    );
    return await this.applicationRepo.save(createApplication);
  }

  async getApplicationById(id: string): Promise<JobApplication> {
    const application = await this.applicationRepo.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException();
    }
    return application;
  }
}
