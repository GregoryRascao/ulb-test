import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classement, Student } from 'src/models/etudiant';
import { HopitalResolver } from './hopitalResolver';
import { HopitalService } from './hopitalService';
import { Hopital, Place, Service } from 'src/models/stage';

@Module({
  imports: [TypeOrmModule.forFeature([Hopital, Service, Place])],
  controllers: [],
  providers: [HopitalService, HopitalResolver],
})
export class HopitalModule {}
