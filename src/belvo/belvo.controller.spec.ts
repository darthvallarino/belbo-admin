import { Test, TestingModule } from '@nestjs/testing';
import { BelvoController } from './belvo.controller';

describe('BelvoController', () => {
  let controller: BelvoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BelvoController],
    }).compile();

    controller = module.get<BelvoController>(BelvoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
