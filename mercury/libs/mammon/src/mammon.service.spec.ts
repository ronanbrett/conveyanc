import { Test, TestingModule } from '@nestjs/testing';
import { MammonService } from './mammon.service';

describe('MammonService', () => {
  let service: MammonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MammonService],
    }).compile();

    service = module.get<MammonService>(MammonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
