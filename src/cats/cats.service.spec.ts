import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { DatabaseService } from '../database/database.service';

// Step 1: Define a dynamic mock outside beforeEach
const mockDatabaseService = {
  connect: jest.fn(),
};

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    // Reset mock implementation to a default behavior before each test
    mockDatabaseService.connect.mockResolvedValue({
      collection: () => ({
        find: () => ({
          toArray: () => Promise.resolve([{ name: 'Tom' }, { name: 'Jerry' }]),
        }),
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService, // Step 2: Inject the dynamic mock
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
  });

  // Step 3: Dynamically change mock behavior in a specific test
  it('should return an empty array when no cats are found', async () => {
    mockDatabaseService.connect.mockResolvedValueOnce({
      collection: () => ({
        find: () => ({ toArray: () => Promise.resolve([]) }),
      }),
    });

    expect(await service.findAllCats()).toEqual([]);
  });
});
