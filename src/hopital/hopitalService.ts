import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateHopitalInput,
  CreatePlaceInput,
  CreateServiceInput,
} from 'src/input/hopitalInput';
import { Hopital, Place, Service } from 'src/models/stage';
import { Repository } from 'typeorm';

@Injectable()
export class HopitalService {
  constructor(
    @InjectRepository(Hopital) private hopitalRepository: Repository<Hopital>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}

  async createHopital(hopital: CreateHopitalInput) {
    const newHopital = this.hopitalRepository.create(hopital);
    return this.hopitalRepository.save(newHopital);
  }
  async createService(service: CreateServiceInput) {
    const newService = this.serviceRepository.create(service);
    return this.serviceRepository.save(newService);
  }

  async createPlace(place: CreatePlaceInput) {
    const newPlace = this.placeRepository.create(place);
    return this.placeRepository.save(newPlace);
  }

  async getHopitals() {
    return this.hopitalRepository.find();
  }

  async getPlaces() {
    return this.placeRepository.find();
  }

  async getHopital(id: number) {
    return this.hopitalRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateHopital(id: number, hopital: CreateHopitalInput) {
    return this.hopitalRepository.update(id, hopital);
  }
}
