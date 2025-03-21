import { registerEnumType } from '@nestjs/graphql';

export enum reviewStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
}

registerEnumType(reviewStatus, {
  name: 'reviewStatus',
  description: 'Represents the status of a review',
});
