import { get } from 'config';
import { S3 } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { S3StorageService } from './s3-storage.service';
import { AWSConfig } from 'apps/mercury/src/core/config/aws.config';

const config: AWSConfig = get('AWS');

export const S3_CLIENT = 'S3_CLIENT';

const s3Client = new S3({
  region: config.region,
  // endpoint: 'http://localhost:4572',
});

const S3_CLIENT_PROVIDER = {
  provide: S3_CLIENT,
  useValue: s3Client,
};

@Module({
  providers: [S3StorageService, S3_CLIENT_PROVIDER],
  exports: [S3StorageService, S3_CLIENT_PROVIDER],
})
export class S3StorageModule {}
