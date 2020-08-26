import { Inject, Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { S3_CLIENT } from '@utils/s3-storage';
import {
  PropertyOutput,
  PropertyType,
  PropertyInputArgs,
} from '@schemas/graphql';

const MOCK_DATA: any = {
  _id: 'test',
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
export class PropertyService {
  constructor(@Inject(S3_CLIENT) private s3Client: S3) {}

  async create(property: PropertyInputArgs): Promise<PropertyOutput> {
    return property as PropertyOutput;
  }

  async getOne(id: string): Promise<PropertyOutput> {
    return MOCK_DATA;
  }
}
