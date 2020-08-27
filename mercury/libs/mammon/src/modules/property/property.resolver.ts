import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyDTO, PropertyInputArgs } from '@schemas/graphql';

@Resolver('Property')
export class PropertyResolver {
  constructor(private propertyService: PropertyService) {}

  @Query()
  async property(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PropertyDTO> {
    return this.propertyService.get(id);
  }

  @Query()
  async properties(): Promise<PropertyDTO[]> {
    return this.propertyService.getAll();
  }

  @Mutation()
  async createProperty(
    @Args('property') property: PropertyInputArgs,
  ): Promise<PropertyDTO> {
    return this.propertyService.save(property, property.propertyId);
  }
}
