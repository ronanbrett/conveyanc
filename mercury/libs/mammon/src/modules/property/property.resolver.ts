import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import {
  PropertyDTO,
  PropertyInputArgs,
  PropertyInfo,
  PropertyType,
} from '@schemas/graphql';
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

  @Query()
  async propertyInfo(): Promise<PropertyInfo> {
    return {
      propertyType: [
        {
          label: 'Apartment',
          value: PropertyType.APPARTMENT,
          group: PropertyType.APPARTMENT,
        },
        { label: 'Duplex', value: 'DUPLEX', group: PropertyType.APPARTMENT },
        { label: 'House', value: 'HOUSE', group: PropertyType.HOUSE },
        { label: 'Land', value: 'LAND', group: PropertyType.SITE },
      ],
    };
  }

  @Mutation()
  async createProperty(
    @Args('property') property: PropertyInputArgs,
  ): Promise<PropertyDTO> {
    return this.propertyService.save(property, property.propertyId);
  }
}
