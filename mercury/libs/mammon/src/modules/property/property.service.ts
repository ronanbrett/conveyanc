import { S3 } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyInputArgs } from '@schemas/graphql';
import { BaseRepository } from '@utils/base/classes/base-respository.class';
import { S3_CLIENT } from '@utils/s3-storage';
import { Model } from 'mongoose';
import { PropertyDocument } from './property.model';

@Injectable()
export class PropertyService extends BaseRepository<
  PropertyDocument,
  PropertyInputArgs
> {
  constructor(
    @InjectModel(PropertyDocument.name)
    public propertyModel: Model<PropertyDocument>,
    @Inject(S3_CLIENT) private s3Client: S3,
  ) {
    super(propertyModel, 'propertyId');
  }
}
