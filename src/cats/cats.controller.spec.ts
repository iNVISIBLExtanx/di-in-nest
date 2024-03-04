import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let mockCatsService;

  beforeEach(async () => {
    mockCatsService = {
      findAllCats: jest
        .fn()
        .mockResolvedValue([{ name: 'Tom' }, { name: 'Jerry' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cats', async () => {
    expect(await controller.findAll()).toEqual([
      { name: 'Tom' },
      { name: 'Jerry' },
    ]);
    expect(mockCatsService.findAllCats).toBeCalled();
  });
});
