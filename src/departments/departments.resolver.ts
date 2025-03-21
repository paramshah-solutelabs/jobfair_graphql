import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { createDepartmentDto } from './dto/create-department.dto';
import { Department } from './departments.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { IsEmployee } from 'src/employees/guards/isEmployee.guard';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentsService) {}

  @Mutation(() => Department)
  async createDepartment(
    @Args('data') data: createDepartmentDto,
  ): Promise<Department> {
    return await this.departmentService.createDepartment(data);
  }

  @UseGuards(GqlAuthGuard,IsEmployee)
  @Query(() => [Department])
  async getDepartments(): Promise<Department[]> {
    return await this.departmentService.getDepartments();
  }

  @Query(() => Department)
  async getDepartmentById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Department> {
    return await this.departmentService.getDepartmentById(id);
  }
}
