import { registerEnumType } from '@nestjs/graphql';

export enum MeetingType {
  IN_PERSON = 'In-Person',
  VIRTUAL = 'Virtual',
  PHONE = 'Phone',
}

registerEnumType(MeetingType, {
  name: 'MeetingType',
});
