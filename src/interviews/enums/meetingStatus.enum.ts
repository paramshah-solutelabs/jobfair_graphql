import { registerEnumType } from '@nestjs/graphql';

export enum MeetingStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

registerEnumType(MeetingStatus, {
  name: 'MeetingStatus',
});
