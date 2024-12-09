import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classement, Student } from 'src/models/etudiant';
import { StudentService } from './etudiantService';
import { StudentResolver } from './etudiantResolver';
import { Hopital, Service, Place } from 'src/models/stage';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Classement, Hopital, Service, Place]),
  ],
  controllers: [],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
