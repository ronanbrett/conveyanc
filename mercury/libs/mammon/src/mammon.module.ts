import { Module } from '@nestjs/common';
import { CachingModule } from '@utils/caching';
import { MammonService } from './mammon.service';
import { PropertyListingsModule } from './modules/property-listings/property-listings.module';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [PropertyModule, PropertyListingsModule, CachingModule],
  providers: [MammonService],
  exports: [PropertyModule],
})
export class MammonModule {}
