import { Document, Mongoose } from 'mongoose';
import {
  AddressOutput,
  Dimensions,
  PropertyListingDTO,
  PropertyFacility,
  PropertyDTO,
  PropertyType,
  GeoJSONPointScalar,
  S3Object,
  S3ObjectArgs,
  DateTime,
  AddressComponentOutput,
} from '@schemas/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '@utils/base';

@Schema({
  collection: 'property-registry',
})
export class PropertyListingDocument extends Document
  implements PropertyListingDTO {
  @Prop()
  propertyListingId: string;

  @Prop()
  dateOfSale?: DateTime;

  @Prop()
  address: string;

  @Prop()
  postCode: string;

  @Prop()
  county: string;

  @Prop()
  price: number;

  @Prop()
  notFullMarketPrice: boolean;

  @Prop()
  VATExclusive: boolean;

  @Prop()
  description: string;

  @Prop()
  propertySize: string;

  @Prop()
  formattedAddress?: string;

  @Prop()
  addressComponents: AddressComponentOutput[];

  @Prop()
  location?: GeoJSONPointScalar;

  @Prop()
  electoralDistrict: string;

  @Prop()
  electoralDistrictId: string;
}

export const PropertyListingSchema = SchemaFactory.createForClass(
  PropertyListingDocument,
);
