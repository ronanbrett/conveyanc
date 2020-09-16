import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyListingsService } from './property-listings.service';

@Resolver('PropertyListings')
export class PropertyListingsResolver {
  constructor(private propertyListingService: PropertyListingsService) {}

  @Query()
  async getPropertiesForMonth(
    @Args('fromDate', { type: () => Date }) fromDate: Date,
    @Args('toDate', { type: () => Date }) toDate: Date,
  ): Promise<any> {
    const results = await this.propertyListingService.getPropertiesBetweenDates(
      fromDate,
      toDate,
    );

    return results;
  }

  @Query()
  async updateProperties(
    @Args('limit', { type: () => Number }) limit: number,
    @Args('skip', { type: () => Number }) skip: number,
  ): Promise<any> {
    const results = await this.propertyListingService.updateProperties(
      limit,
      skip,
    );

    return true;
  }
}
