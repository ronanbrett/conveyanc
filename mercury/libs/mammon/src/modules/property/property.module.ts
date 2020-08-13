import { Module } from '@nestjs/common';
import { S3StorageModule } from '@utils/s3-storage';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';

@Module({
  imports: [S3StorageModule],
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}
