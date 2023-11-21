import { Test, TestingModule } from '@nestjs/testing';
import { Schedular } from './schedular';

describe('Schedular', () => {
  let provider: Schedular;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Schedular],
    }).compile();

    provider = module.get<Schedular>(Schedular);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
