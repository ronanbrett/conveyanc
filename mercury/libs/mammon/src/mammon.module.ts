import { Module } from '@nestjs/common';
import { CachingModule } from '@utils/caching';
import { MammonService } from './mammon.service';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [PropertyModule, CachingModule],
  providers: [MammonService],
  exports: [PropertyModule],
})
export class MammonModule {}
