import { Module } from '@nestjs/common';
import { MammonService } from './mammon.service';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [PropertyModule],
  providers: [MammonService],
  exports: [PropertyModule],
})
export class MammonModule {}
