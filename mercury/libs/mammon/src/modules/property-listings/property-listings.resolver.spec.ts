import { Test, TestingModule } from '@nestjs/testing';
import { PropertyListingsResolver } from './property-listings.resolver';

describe('PropertyListingsResolver', () => {
  let resolver: PropertyListingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyListingsResolver],
    }).compile();

    resolver = module.get<PropertyListingsResolver>(PropertyListingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
