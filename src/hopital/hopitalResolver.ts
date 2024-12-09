import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateHopitalInput,
  CreatePlaceInput,
  CreateServiceInput,
} from 'src/input/hopitalInput';
import { Hopital, Place, Service } from 'src/models/stage';
import { HopitalService } from './hopitalService';

@Resolver('Hopital')
export class HopitalResolver {
  constructor(private readonly hopitalService: HopitalService) {}

  @Mutation(() => Hopital)
  async createHopital(@Args('input') input: CreateHopitalInput) {
    return this.hopitalService.createHopital(input);
  }

  @Mutation(() => Service)
  async createService(@Args('input') input: CreateServiceInput) {
    return this.hopitalService.createService(input);
  }

  @Mutation(() => Place)
  async createPlace(@Args('input') input: CreatePlaceInput) {
    return this.hopitalService.createPlace(input);
  }

  @Mutation(() => Hopital)
  async updateHopital(
    @Args('id') id: number,
    @Args('input') input: CreateHopitalInput,
  ) {
    const hopital = new Hopital();
    Object.assign(hopital, input as Partial<Hopital>);
    return this.hopitalService.updateHopital(id, input);
  }

  @Query(() => [Hopital])
  getHopitals() {
    return this.hopitalService.getHopitals();
  }

  @Query(() => Hopital)
  async getHopital(@Args('id') id: number) {
    return this.hopitalService.getHopital(id);
  }

  @Query(() => [Place])
  getPlaces() {
    return this.hopitalService.getPlaces();
  }
}
