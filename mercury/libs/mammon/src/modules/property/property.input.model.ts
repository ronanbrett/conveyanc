import {
  Field,
  ID,
  ObjectType,
  registerEnumType,
  Mutation,
  InputType,
} from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PropertyType } from './property.model';

@InputType()
export class PropertyInputModule {
  @Field(type => ID)
  _id: string;

  @Field(type => PropertyType)
  propertyType?: PropertyType;

  @Field(images => [GraphQLUpload])
  images: FileUpload[];
}
