import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeStatus {
  Fulltime = 'Fulltime',
  Parttime = 'Parttime',
  Invited = 'Invited',
  Active = 'Active',
  Contract = 'Contract',
}

registerEnumType(EmployeeStatus, {
  name: 'EmployeeStatus',
  description: 'Represents the employment status of an employee',
});
