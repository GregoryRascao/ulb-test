import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  matricule: string;

  @Field(() => [CreateClassementInput], { nullable: true })
  classements?: CreateClassementInput[];
}

@InputType()
export class CreateClassementInput {
  @Field(() => Number)
  studentId: number;

  @Field(() => Number)
  rang: number;

  @Field(() => Number)
  typepref: number; // 1: préférence, 2: exclusion

  @Field(() => String)
  hopital: string;

  @Field(() => String)
  service: string;
}
