import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { useAdapter } from '@type-cacheable/ioredis-adapter';
import { REDIS_CLIENT } from '@utils/redis-connection';
import IORedis from 'ioredis';

export enum CacheTtlSeconds {
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}

export class NotCacheableException<T> extends Error {
  public constructor(message: string) {
    super(message);
  }
}

@Injectable()
export class CachingService implements OnModuleInit {
  private redisInstance: IORedis.Redis | undefined;

  constructor(@Inject(REDIS_CLIENT) private client: IORedis.Redis) {}

  public async onModuleInit(): Promise<void> {
    try {
      if (this.isAlreadyConfigured()) {
        return;
      }

      this.redisInstance = this.client;
      this.redisInstance.on('error', (e: Error) => {
        this.handleError(e);
      });

      useAdapter(this.redisInstance);
    } catch (e) {
      this.handleError(e as Error);
    }
  }

  private isAlreadyConfigured(): boolean {
    return this.redisInstance !== undefined;
  }

  private handleError(e: Error): void {
    console.error('Could not connect to Redis cache instance', e);
  }
}
