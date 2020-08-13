import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

export enum PropertyType {
  APPARTMENT,
  HOUSE,
  SITE,
  MOBILE,
  COOPERATIVE,
}

registerEnumType(PropertyType, {
  name: 'PropertyType',
});

@ObjectType()
export class Property {
  @Field(type => ID)
  _id: string;

  @Field(type => PropertyType)
  propertyType?: PropertyType;
}
