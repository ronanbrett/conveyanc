import { Test, TestingModule } from '@nestjs/testing';
import { CachingService } from './caching.service';
import { REDIS_CLIENT } from '@utils/redis-connection';
import { mocked } from 'ts-jest/utils';

import IORedis from 'ioredis';
import { Cacheable } from '@type-cacheable/core';

jest.mock('ioredis');

export class TestClass {
  static setCacheKey = (args: any[]) => args[0];
  private values: any[] = [1, 2, 3, 4, 5];

  @Cacheable({ cacheKey: 'values' })
  public getValues(): Promise<number[]> {
    return Promise.resolve(this.values);
  }

  @Cacheable({ cacheKey: TestClass.setCacheKey })
  public getValue(id: number): Promise<number | undefined> {
    return Promise.resolve(this.values.find(num => num === id));
  }
}

describe('CachingService', () => {
  let service: CachingService;
  let testService: TestClass;
  let redis: IORedis.Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CachingService,
        {
          provide: REDIS_CLIENT,
          useClass: IORedis,
        },
        TestClass,
      ],
    }).compile();

    service = module.get<CachingService>(CachingService);

    await service.onModuleInit();
    testService = module.get<TestClass>(TestClass);
    redis = module.get(REDIS_CLIENT);

    jest.clearAllMocks();
  });

  describe('Service', () => {
    it('should have a redis instance defined', () => {
      expect(service['redisInstance']).toBeDefined();
    });
  });

  describe('Caching Functions', () => {
    it('should be able to cache a string', async () => {
      await testService.getValue(0);
      expect(redis.set).toHaveBeenCalledWith(0, undefined, []);
      await testService.getValue(0);
      expect(redis.get).toHaveBeenCalledWith(0);
    });

    it('should be able to cache an array', async () => {
      await testService.getValues();
      expect(redis.set).toHaveBeenCalledWith('values', '[1,2,3,4,5]', []);
      await testService.getValues();
      expect(redis.get).toHaveBeenCalledWith('values');
    });
  });
});
