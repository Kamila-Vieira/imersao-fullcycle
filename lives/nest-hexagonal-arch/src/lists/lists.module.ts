import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { ListGatewayHttp } from './gateways/list-gateway-http';

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
    {
      provide: 'ListPersistenceGateway', // prover a interface no serviço do Sequelize para abstrai-lo do serviço de lista
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway', // prover a interface no serviço de envio para o crm externo
      useExisting: ListGatewayHttp,
    },
  ],
})
export class ListsModule {}
