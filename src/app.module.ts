import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { JobapplicationModule } from './jobapplication/jobapplication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://employees_sgp1_user:w48umRsEl4XFabAPw5RSCoDIbajgtsdp@dpg-cvbr76aj1k6c73e189f0-a.oregon-postgres.render.com/employees_sgp1',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    DepartmentsModule,
    PositionsModule,
    JobapplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}









