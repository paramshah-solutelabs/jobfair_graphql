import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './departments.entity';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Department])],
    providers: [DepartmentsService],
    controllers: [DepartmentsController]
})
export class DepartmentsModule {}
