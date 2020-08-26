import { Module } from '@nestjs/common';
import { RedisConnectionModule } from '@utils/redis-connection';
import { CachingService } from './caching.service';

@Module({
  imports: [RedisConnectionModule],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
