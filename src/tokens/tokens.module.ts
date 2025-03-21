import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from './tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens])],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
