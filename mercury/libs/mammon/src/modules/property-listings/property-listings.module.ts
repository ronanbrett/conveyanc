import { Module } from '@nestjs/common';
import { PropertyListingsService } from './property-listings.service';
import { PropertyListingsResolver } from './property-listings.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PropertyListingDocument,
  PropertyListingSchema,
} from './property-listings.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PropertyListingDocument.name, schema: PropertyListingSchema }],
      'geography',
    ),
  ],
  providers: [PropertyListingsService, PropertyListingsResolver],
})
export class PropertyListingsModule {}
