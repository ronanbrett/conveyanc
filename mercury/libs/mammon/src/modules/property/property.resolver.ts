import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyDTO, PropertyInputArgs } from '@schemas/graphql';
import { Pagination } from '@utils/base/interfaces/pagination.interface';

@Resolver('Property')
export class PropertyResolver {
  constructor(private propertyService: PropertyService) {}

  @Query()
  async property(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PropertyDTO> {
    return this.propertyService.getProperty(id);
  }

  @Query()
  async properties(): Promise<PropertyDTO[]> {
    return this.propertyService.getAll();
  }

  @Query()
  async propertiesPaged(
    @Args('first', { type: () => Number }) first: number,
    @Args('after', { type: () => String }) after: string,
  ): Promise<Pagination<PropertyDTO>> {
    return this.propertyService.getAllPropertiesPaged({ first, after });
  }

  @Mutation()
  async createProperty(
    @Args('property') property: PropertyInputArgs,
  ): Promise<PropertyDTO> {
    return this.propertyService.save(property, property.propertyId);
  }
}
