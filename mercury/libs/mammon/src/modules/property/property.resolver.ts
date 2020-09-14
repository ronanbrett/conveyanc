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
        {
          label: 'Block',
          value: 'APT_BLOCK',
          group: PropertyType.APPARTMENT,
        },
        {
          label: 'Penthouse',
          value: 'APT_PENTHOUSE',
          group: PropertyType.APPARTMENT,
        },
        {
          value: 'APT_STUDIO',
          label: 'Studio',
          group: PropertyType.APPARTMENT,
        },
        {
          value: 'APT_OFFPLAN',
          label: 'Off Plan / New Appartments',
          group: PropertyType.APPARTMENT,
        },
        { label: 'Duplex', value: 'HOUSE_DUPLEX', group: PropertyType.HOUSE },
        {
          label: 'Free Standing',
          value: 'HOUSE_FREE_STANDING',
          group: PropertyType.HOUSE,
        },
        {
          label: 'Semi detached',
          value: 'HOUSE_SEMI_D',
          group: PropertyType.HOUSE,
        },
        { label: 'Terrace', value: 'HOUSE_TERRACE', group: PropertyType.HOUSE },
        { label: 'Villa', value: 'HOUSE_VILLA', group: PropertyType.HOUSE },
        { label: 'New Housing', value: 'HOUSE_NEW', group: PropertyType.HOUSE },
        {
          label: 'Town House',
          value: 'HOUSE_TOWNHOUSE',
          group: PropertyType.HOUSE,
        },
        { label: 'House', value: 'HOUSE', group: PropertyType.HOUSE },
        { label: 'Land', value: 'LAND', group: PropertyType.SITE },
        { label: 'Vacant', value: 'LAND_VACANT', group: PropertyType.SITE },
      ],
    };
  }

  @Mutation()
  async createProperty(
    @Args('property') property: PropertyInputArgs,
  ): Promise<PropertyDTO> {
    console.log(property);
    return this.propertyService.saveProperty(property);
  }
}
