import { S3Client } from '@aws-sdk/client-s3';
import { Inject } from '@nestjs/common';
import { Args, Int, Resolver, Query } from '@nestjs/graphql';
import { Property, PropertyType } from './property.model';
import { PropertyService } from './property.service';

@Resolver('Property')
export class PropertyResolver {
  constructor(private propertyService: PropertyService) {}
  @Query(returns => Property)
  async property(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Property> {
    return this.propertyService.getOne();
  }
}
