import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'hopital' })
@ObjectType()
export class Hopital {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  nom: string;
}
@Entity({ name: 'service' })
@ObjectType()
export class Service {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  nom: string;
}
@Entity({ name: 'Place' })
@ObjectType()
export class Place {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  hopital: string;

  @Column()
  @Field(() => String)
  service: string;

  @Column()
  @Field(() => String)
  places: number;
}
