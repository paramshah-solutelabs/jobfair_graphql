import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './jobapplication.entity';

@Module({
    imports:[TypeOrmModule.forFeature([JobApplication])]
})
export class JobapplicationModule {}
