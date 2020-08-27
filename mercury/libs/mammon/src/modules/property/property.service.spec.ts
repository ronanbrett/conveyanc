import { S3 } from '@aws-sdk/client-s3';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { S3_CLIENT } from '@utils/s3-storage';
import mockingoose from 'mockingoose';
import { Mock } from 'mockingoose';
import { model } from 'mongoose';
import { PropertyDocument, PropertySchema } from './property.model';
import { PropertyService } from './property.service';

jest.mock('@aws-sdk/client-s3');

const PropertyDocumentMock = model(PropertyDocument.name, PropertySchema);
const MongooseMock = mockingoose(
  model(PropertyDocument.name, PropertySchema),
).toReturn({});

const mockProperty = {
  _id: '5f46f52a921d8a13036a1398',
  propertyId: '2fbef623-ff7e-4507-a141-a555ef88c3bf',
  type: 'APPARTMENT',
  description: {
    test: 'test',
  },
  facilities: [],
};

describe('PropertyService', () => {
  let service: PropertyService;
  let properyModle: Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(PropertyDocument.name),
          useValue: PropertyDocumentMock,
        },
        PropertyService,
        { provide: S3_CLIENT, useClass: S3 },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    properyModle = module.get(getModelToken(PropertyDocument.name));

    MongooseMock.reset();

    // modelMock.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('For retrieving', () => {
    it('should be able to retrieve a property', async () => {
      // console.log(model);
      MongooseMock.toReturn(mockProperty, 'findOne');

      const res = await service.get('5f46f52a921d8a13036a1398');
      expect(JSON.parse(JSON.stringify(res))).toMatchObject(mockProperty);
    });

    it('should be able to retrieve a list of property', async () => {
      MongooseMock.toReturn([mockProperty], 'find');

      const res = await service.getAll();
      expect(res.length).toEqual(1);
    });
  });

  describe('For creating', () => {
    it('should be able to create a property', async () => {
      // console.log(model);
      MongooseMock.toReturn(mockProperty, 'findOneAndUpdate');

      const res = await service.save(mockProperty as any, '123');
      expect(JSON.parse(JSON.stringify(res))).toMatchObject(mockProperty);
    });
  });
});
