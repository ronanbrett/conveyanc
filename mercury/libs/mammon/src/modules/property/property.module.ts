import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3StorageModule } from '@utils/s3-storage';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';
import { PropertyDocument, PropertySchema } from './property.model';

@Module({
  imports: [
    S3StorageModule,
    MongooseModule.forFeature(
      [{ name: PropertyDocument.name, schema: PropertySchema }],
      'property',
    ),
  ],
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}
