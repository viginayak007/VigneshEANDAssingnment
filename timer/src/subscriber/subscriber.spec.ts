import { Test, TestingModule } from '@nestjs/testing';
import { Subscriber } from './subscriber';

describe('Subscriber', () => {
  let provider: Subscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Subscriber],
    }).compile();

    provider = module.get<Subscriber>(Subscriber);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
