import { Test, TestingModule } from '@nestjs/testing';
import { DbreaderController } from './dbreader.controller';

describe('DbreaderController', () => {
  let controller: DbreaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbreaderController],
    }).compile();

    controller = module.get<DbreaderController>(DbreaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
