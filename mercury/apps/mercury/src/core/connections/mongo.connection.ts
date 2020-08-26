import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { get as configGet } from 'config';
import { MongoConfig } from '../config/mongo.config';

const config: MongoConfig = configGet('Mongo');

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${config.host}/users`, {
      connectionName: 'users',
      user: config.user,
      pass: config.password,
    }),
    MongooseModule.forRoot(`mongodb://${config.host}/property`, {
      connectionName: 'property',
      user: config.user,
      pass: config.password,
    }),
  ],
})
export class MongoConnectionModule {}
