import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './positions.entity';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { DepartmentsService } from 'src/departments/departments.service';

@Injectable()
export class PositionsRepository {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private departmentService: DepartmentsService,
  ) {}

  async createPosition(
    createPositionData: CreatePositionDto,
  ): Promise<Position> {
    const department = await this.departmentService.getDepartmentById(
      createPositionData.departmentId,
    );
    if (!department) {
      throw new Error('Department not found');
    }
    const createPosition = this.positionRepository.create(createPositionData);
    createPosition.department = department;

    return await this.positionRepository.save(createPosition);
  }

  async getPositionById(id: string): Promise<Position> {
    const foundPosition = await this.positionRepository.findOne({
      where: { id },
    });
    if (!foundPosition) {
      throw new NotFoundException();
    }
    return foundPosition;
  }
}
