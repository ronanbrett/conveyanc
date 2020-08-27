import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { S3_CLIENT } from '@utils/s3-storage';
import {
  PropertyOutput,
  PropertyType,
  PropertyInputArgs,
} from '@schemas/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyDocument } from './property.model';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { BaseRepository } from '@utils/base/classes/base-respository.class';

const MOCK_DATA: any = {
  id: 'test',
  type: PropertyType.HOUSE,
  address: {
    formattedAddress: '123',
  },
  description: {
    test: {
      test: 123,
    },
  },
};

@Injectable()
export class PropertyService extends BaseRepository<
  PropertyDocument,
  PropertyInputArgs
> {
  constructor(
    @InjectModel(PropertyDocument.name)
    private propertyModel: Model<PropertyDocument>,
    @Inject(S3_CLIENT) private s3Client: S3,
  ) {
    super(propertyModel, 'propertyId');
  }
}
