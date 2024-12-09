import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHopitalInput {
  @Field(() => String)
  nom: string;
}
@InputType()
export class CreateServiceInput {
  @Field(() => String)
  nom: string;
}
@InputType()
export class CreatePlaceInput {
  @Field(() => String)
  hopital: string;

  @Field(() => String)
  service: string;

  @Field(() => String)
  places: number;
}
