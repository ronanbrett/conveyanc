import { Test, TestingModule } from '@nestjs/testing';
import { PropertyListingsService } from './property-listings.service';

describe('PropertyListingsService', () => {
  let service: PropertyListingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyListingsService],
    }).compile();

    service = module.get<PropertyListingsService>(PropertyListingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
