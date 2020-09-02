import { S3 } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyInputArgs } from '@schemas/graphql';
import { Cacheable } from '@type-cacheable/core';
import { BaseRepository } from '@utils/base/classes/base-respository.class';
import { Pagination } from '@utils/base/interfaces/pagination.interface';
import { TTL_DEFAULTS } from '@utils/base/enums/TTL_DEFAULTS.enum';
import { S3_CLIENT } from '@utils/s3-storage';
import { Model } from 'mongoose';
import { PropertyDocument } from './property.model';
import { PropertyType } from '@schemas/graphql';

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
    ttlSeconds: TTL_DEFAULTS.ONEDAY,
  })
  async getProperty(objectId: string): Promise<PropertyDocument> {
    const res = await this.get(objectId);
    return res;
  }

  @Cacheable({
    hashKey: 'PROP',
    ttlSeconds: TTL_DEFAULTS.ONEDAY,
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
}
