import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ListCreatedEvent } from '../events/list-created-event';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';

@Injectable() // Será usado como serviço
export class CreateListInCrmListener {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGatewayInterface,
  ) {}

  @OnEvent('list.created') // O método só vai ser disparado quando ocorrer esse evento
  async handle(event: ListCreatedEvent) {
    this.listIntegrationGateway.create(event.list);
  }
}
