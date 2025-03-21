import { Injectable } from '@nestjs/common';
import { PositionsRepository } from './positions.repository';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './positions.entity';

@Injectable()
export class PositionsService {
  constructor(private positionRepository: PositionsRepository) {}

  async createPosition(data: CreatePositionDto): Promise<Position> {
    return await this.positionRepository.createPosition(data);
  }

  async getPositionById(id: string): Promise<Position> {
    return await this.positionRepository.getPositionById(id);
  }
}
