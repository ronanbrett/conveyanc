import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

export interface UserModel {
  username: string;
  lastLoginDate?: Date;

  devices?: [
    {
      credentialID: string;
      publicKey: string;
      counter: number;
    },
  ];
}

@ObjectType()
export class UserFields implements Partial<UserModel> {
  @Field(type => String)
  username: string;

  @Field(type => GraphQLISODateTime, { nullable: true })
  lastLoginDate: Date;
}
