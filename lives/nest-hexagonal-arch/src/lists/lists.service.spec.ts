import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

const mockList = {
  create: jest
    .fn()
    .mockReturnValue(Promise.resolve(new List({ name: 'My list' }))),
};

const mockHttpService = {
  post: jest.fn(),
};

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(async () => {
    service = new ListsService(mockList as any, mockHttpService as any);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'My list' });
    console.log(list);
    expect(list).toBeDefined();
  });
});
