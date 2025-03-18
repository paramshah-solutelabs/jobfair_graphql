import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './positions.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Position])]
})
export class PositionsModule {}
