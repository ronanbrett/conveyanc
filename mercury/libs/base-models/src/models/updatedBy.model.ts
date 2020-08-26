import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

export interface UpdatedCreatedFieldsModel {
  lastUpdatedBy?: string;

  lastUpdatedDate?: Date;

  createdBy?: string;

  createdDate?: Date;
}

@ObjectType()
export class UpdatedCreatedFields implements UpdatedCreatedFieldsModel {
  @Field(type => String)
  lastUpdatedBy?: string;

  @Field(type => GraphQLISODateTime)
  lastUpdatedDate?: Date;

  @Field(type => String)
  createdBy?: string;

  @Field(type => GraphQLISODateTime)
  createdDate?: Date;
}
