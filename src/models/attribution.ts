import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Attribution {
  @Field(() => String)
  matricule: string;

  @Field(() => String)
  hopitalAndService: string;
}
