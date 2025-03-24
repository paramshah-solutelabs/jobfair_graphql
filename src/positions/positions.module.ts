import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './positions.entity';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';
import { PositionsRepository } from './positions.repository';
import { DepartmentsModule } from './../../src/departments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), DepartmentsModule],
  providers: [PositionsResolver, PositionsService, PositionsRepository],
  exports: [PositionsService],
})
export class PositionsModule {}
