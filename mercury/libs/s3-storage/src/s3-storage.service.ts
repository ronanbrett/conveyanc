import { Injectable, Inject } from '@nestjs/common';
import { S3_CLIENT } from './s3-storage.module';
import { S3 } from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageService {}
