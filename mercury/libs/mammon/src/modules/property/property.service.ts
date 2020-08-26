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
import { v4 } from 'uuid';

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
export class PropertyService {
  constructor(
    @InjectModel(PropertyDocument.name)
    private propertyModel: Model<PropertyDocument>,
    @Inject(S3_CLIENT) private s3Client: S3,
  ) {}

  async create({
    id,
    type,
    description,
  }: PropertyInputArgs): Promise<PropertyOutput> {
    const prop = await this.propertyModel.findOneAndUpdate(
      { id: id },
      { type, description, id: id ?? v4() },
      { upsert: true, new: true },
    );

    console.log(prop);
    return prop as PropertyOutput;
  }

  async getOne(id: string): Promise<PropertyOutput> {
    const res = await this.propertyModel.findById(id);
    return res as PropertyOutput;
  }

  async getAll(): Promise<PropertyOutput[]> {
    const prop = await this.propertyModel.find();
    return prop as PropertyOutput[];
  }
}
