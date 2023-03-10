import { ListCreatedEvent } from './events/list-created-event';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  const eventEmitterMock = {
    emit: jest.fn(),
  };

  beforeEach(() => {
    listPersistenceGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, eventEmitterMock as any);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'My list' });
    expect(listPersistenceGateway.items).toEqual([list]);
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'list.created',
      new ListCreatedEvent(list),
    );
  });
});
