import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Position } from './positions.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { PositionsService } from './positions.service';

@Resolver()
export class PositionsResolver {
  constructor(private positionService: PositionsService) {}

  @Mutation(() => Position)
  async createPosition(
    @Args('data') data: CreatePositionDto,
  ): Promise<Position> {
    return await this.positionService.createPosition(data);
  }
}
