import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// Step 1: Dynamic mock setup
const mockCatsService = {
  findAllCats: jest.fn(),
};

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    // Reset mock to default behavior before each test
    mockCatsService.findAllCats.mockResolvedValue([
      { name: 'Tom' },
      { name: 'Jerry' },
    ]);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService, // Step 2: Injecting the dynamic mock
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

  // Step 3: Dynamically updating mock behavior for a specific test
  it('should return an empty array when no cats are found', async () => {
    mockCatsService.findAllCats.mockResolvedValueOnce([]);

    expect(await controller.findAll()).toEqual([]);
    expect(mockCatsService.findAllCats).toBeCalled();
  });
});
