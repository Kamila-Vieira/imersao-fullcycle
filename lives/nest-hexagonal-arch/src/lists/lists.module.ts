import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { ListGatewayHttp } from './gateways/list-gateway-http';
import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    CreateListInCrmListener,
    {
      provide: 'ListPersistenceGateway', // prover a interface no serviço do Sequelize para abstrai-lo do serviço de lista
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway', // prover a interface no serviço de envio para o crm externo
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter', // prover a interface no serviço de disparo de eventos
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
