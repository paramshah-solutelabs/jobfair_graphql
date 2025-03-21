import { Body, Controller, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}

  @Post('/create')
  async createDepartment(@Body() data) {
    return await this.departmentService.createDepartment(data);
  }
}
