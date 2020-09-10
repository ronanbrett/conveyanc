import { S3 } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyInputArgs, PropertyDTO } from '@schemas/graphql';
import { Cacheable, CacheClear } from '@type-cacheable/core';
import { BaseRepository } from '@utils/base/classes/base-respository.class';
import { Pagination } from '@utils/base/interfaces/pagination.interface';
import { getS3Url } from '@utils/base/utils';
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

  @Cacheable({
    hashKey: 'PROP',
  })
  async getProperty(objectId: string): Promise<PropertyDocument> {
    const res = await this.get(objectId);
    return res;
  }

  @Cacheable({
    hashKey: 'PROP',
  })
  async getAllPropertiesPaged({
    first,
    after,
  }: {
    first: number;
    after: string;
  }): Promise<Pagination<PropertyDocument>> {
    const res = await this.getAllPaged({ first, after });
    return res;
  }

  @CacheClear({
    hashKey: 'PROP',
  })
  async saveProperty(property: PropertyInputArgs): Promise<PropertyDocument> {
    const mProperty: PropertyInputArgs = {
      ...property,
      images: property.images
        ? property.images.map(image => getS3Url(image))
        : [],
    };
    return this.save(mProperty, property.propertyId);
  }
}
