import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class InviteResponse {
  @Field()
  message: string;
}
