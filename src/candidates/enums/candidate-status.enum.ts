import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Blocklisted = 'blocklisted',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Candidate account status',
});
