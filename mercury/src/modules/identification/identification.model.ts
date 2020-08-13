import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserI {
  _id?: string;
  username: string;

  devices?: [
    {
      credentialID: string;
      publicKey: string;
      counter: number;
    },
  ];
}

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
    type: String,
  })
  username: string;

  @Prop({
    required: false,
  })
  devices?: [
    {
      credentialID: string;
      publicKey: string;
      counter: number;
    },
  ];
}
export const UserSchema = SchemaFactory.createForClass(User);
