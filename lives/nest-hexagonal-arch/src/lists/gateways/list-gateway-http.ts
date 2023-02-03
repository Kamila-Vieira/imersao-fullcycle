import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateway-interface';

@Injectable() //Será usado como serviço
export class ListGatewayHttp implements ListGatewayInterface {
  //Adapter para serviço externo (Simulação de envio para um crm externo)
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(this.httpService.post('lists', { name: list.name }));
    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get<List[]>('lists'));
    return data.map((list) => new List(list.name, list.id));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.get<List>(`lists/${id}`),
    );

    return new List(data.name, data.id);
  }
}
