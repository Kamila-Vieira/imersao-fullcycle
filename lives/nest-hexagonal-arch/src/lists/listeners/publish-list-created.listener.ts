import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { ListCreatedEvent } from '../events/list-created-event';

@Injectable() // Será usado como serviço
export class PublishListCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('list.created') // O método só vai ser disparado quando ocorrer esse evento
  async handle(event: ListCreatedEvent) {
    this.queue.add('list.created', event); // Adiciona o evento á lista de processamento
  }
}
