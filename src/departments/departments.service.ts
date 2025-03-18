import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Department } from './departments.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private departmentRepo:Repository<Department>
    ){}

    async createDepartment(data){
        return await this.departmentRepo.save(data)
    }
}
