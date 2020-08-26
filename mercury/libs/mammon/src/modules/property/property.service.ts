import { Inject, Injectable } from '@nestjs/common';
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
  constructor(
    @InjectModel(PropertyDocument.name)
    private propertyModel: Model<PropertyDocument>,
    @Inject(S3_CLIENT) private s3Client: S3,
  ) {}

  async create({
    type,
    description,
  }: PropertyInputArgs): Promise<PropertyOutput> {
    const prop = await this.propertyModel.create({ type, description });
    return prop as PropertyOutput;
  }

  async getOne(id: string): Promise<PropertyOutput> {
    const res = await this.propertyModel.findById(id);
    return res;
  }

  async getAll(): Promise<PropertyOutput[]> {
    const prop = await this.propertyModel.find();
    return prop as PropertyOutput[];
  }
}
