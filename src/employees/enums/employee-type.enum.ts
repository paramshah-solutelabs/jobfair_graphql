import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeType {
  INTERVIEWER = 'Interviewer',
  HIRINGMANAGER = 'HiringManager',
  RECRUITER = 'Recruiter',
  HR = 'Hr',
  EMPLOYEE='Employee'
}

registerEnumType(EmployeeType, {
  name: 'EmployeeType',
  description: 'Types of employees in the system',
});
