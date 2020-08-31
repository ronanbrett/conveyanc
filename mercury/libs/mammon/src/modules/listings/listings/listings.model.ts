import { Prop, Schema } from '@nestjs/mongoose';
import { ListingDTO } from '@schemas/graphql';
import { BaseModel } from '@utils/base';
import { Document } from 'mongoose';
import { PropertyDocument } from '../../property/property.model';

@Schema()
export class ListingDocument extends Document implements ListingDTO, BaseModel {
  @Prop()
  property?: PropertyDocument[];

  @Prop()
  description: any;
}
