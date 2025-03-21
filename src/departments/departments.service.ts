import { Injectable } from '@nestjs/common';
import { DepartmentsRepository } from './departments.repository';
import { Department } from './departments.entity';

@Injectable()
export class DepartmentsService {
  constructor(private departmentRepo: DepartmentsRepository) {}

  async createDepartment(data) {
    return await this.departmentRepo.createDepartment(data);
  }

  async getDepartments() {
    return await this.departmentRepo.getDepartments();
  }

  async getDepartmentById(id: string): Promise<Department> {
    return await this.departmentRepo.getDepartmentById(id);
  }
}
