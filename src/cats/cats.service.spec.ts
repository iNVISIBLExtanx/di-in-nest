import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { DatabaseService } from '../database/database.service';

describe('CatsService', () => {
  let service: CatsService;
  let mockDatabaseService;

  beforeEach(async () => {
    mockDatabaseService = {
      connect: jest.fn().mockResolvedValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnThis(),
          toArray: jest
            .fn()
            .mockResolvedValue([{ name: 'Tom' }, { name: 'Jerry' }]),
        }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', async () => {
    expect(await service.findAllCats()).toEqual([
      { name: 'Tom' },
      { name: 'Jerry' },
    ]);
    expect(mockDatabaseService.connect).toBeCalled();
  });
});
