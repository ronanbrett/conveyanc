import { S3 } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { S3_CLIENT } from '@utils/s3-storage';
import { PropertyType } from './property.model';

@Injectable()
export class PropertyService {
  constructor(@Inject(S3_CLIENT) private s3Client: S3) {}

  async getOne() {
    return {
      _id: 'test',
      propertyType: PropertyType.HOUSE,
    };
  }
}
