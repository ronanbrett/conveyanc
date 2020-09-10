import { Document, Mongoose } from 'mongoose';
import {
  AddressOutput,
  Dimensions,
  PropertyFacility,
  PropertyDTO,
  PropertyType,
  GeoJSONPointScalar,
  S3Object,
  S3ObjectArgs,
} from '@schemas/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '@utils/base';

@Schema()
export class PropertyDocument extends Document
  implements PropertyDTO, BaseModel {
  @Prop()
  propertyId: string;

  @Prop()
  address?: AddressOutput;

  @Prop()
  type: PropertyType;

  @Prop()
  description: any;

  @Prop()
  dimensions?: Dimensions;

  @Prop()
  facilities?: PropertyFacility[];

  @Prop()
  location?: GeoJSONPointScalar;

  @Prop()
  images?: S3ObjectArgs[];
}

export const PropertySchema = SchemaFactory.createForClass(PropertyDocument);
