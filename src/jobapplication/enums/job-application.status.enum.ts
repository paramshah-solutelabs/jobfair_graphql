import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationStatus {
  NEW = 'New',
  SCREENING = 'Screening',
  APPROVED = 'Approved',
  REVIEW = 'Reviewed',
  INTERVIEW = 'Interviewed',
  OFFER = 'Offered',
  REJECTED = 'Rejected',
  HIRED = 'Hired',
}
registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus',
  description: 'Possible statuses of a job application',
});
