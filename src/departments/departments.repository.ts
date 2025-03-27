import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Department } from './departments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createDepartmentDto } from './dto/create-department.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class DepartmentsRepository {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
    private dataSource: DataSource,
  ) {}

  async createDepartment(
    createDepartmentData: createDepartmentDto,
  ): Promise<Department> {
    const createDepartment =
      await this.departmentRepo.create(createDepartmentData);
    return await this.departmentRepo.save(createDepartment);
  }

  async getDepartments() {
    return await this.departmentRepo.find();
  }

  async getDepartmentById(id: string): Promise<Department> {
    const foundDepartment = await this.departmentRepo.findOne({
      where: { id },
    });
    if (!foundDepartment) {
      throw new NotFoundException();
    }
    return foundDepartment;
  }
}
