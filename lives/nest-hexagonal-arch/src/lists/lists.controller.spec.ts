import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

const mockList = {
  create: jest.fn(),
};

const mockHttpService = {
  post: jest.fn(),
};

describe('ListsController', () => {
  let controller: ListsController;

  beforeEach(async () => {
    const service = new ListsService(mockList as any, mockHttpService as any);
    controller = new ListsController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
