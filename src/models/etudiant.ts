import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'students' })
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  matricule: string;

  @OneToMany(() => Classement, (classement) => classement.studentId, {
    eager: true,
  })
  @JoinColumn({ name: 'studentId' })
  @Field(() => [Classement], { nullable: true })
  classements?: Classement[];
}
@Entity({ name: 'classements' })
@ObjectType()
export class Classement {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @ManyToOne(() => Student, (student) => student.classements)
  @Field(() => Number)
  studentId: number;

  @Column()
  @Field(() => Number)
  rang: number;

  @Column()
  @Field(() => Number)
  typepref: number; // 1: préférence, 2: exclusion

  @Column()
  @Field(() => String)
  hopital: string;

  @Column()
  @Field(() => String)
  service: string;
}
