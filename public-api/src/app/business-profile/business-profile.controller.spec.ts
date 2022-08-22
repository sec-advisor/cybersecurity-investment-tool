import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProfileController } from './business-profile.controller';

describe('BusinessProfileController', () => {
  let controller: BusinessProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessProfileController],
    }).compile();

    controller = module.get<BusinessProfileController>(BusinessProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
