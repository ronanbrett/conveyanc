import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { S3 } from '@aws-sdk/client-s3';
import { S3_CLIENT } from '@utils/s3-storage';

jest.mock('@aws-sdk/client-s3');

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyService, { provide: S3_CLIENT, useClass: S3 }],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
