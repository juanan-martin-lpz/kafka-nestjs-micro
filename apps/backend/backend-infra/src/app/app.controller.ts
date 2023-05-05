import { Controller, Inject, LogLevel, Logger, OnModuleInit } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

import { Clause, Condition, Person } from '@my-workspace/domain';
import { Consumer } from 'kafkajs';

@Controller()
export class AppController implements OnModuleInit {

  private cli: Consumer;

  private logger: Logger = new Logger('[Infra]')
  constructor(
    private readonly appService: AppService,
    private http: HttpService,
    @Inject('TEST_MICROSERVICE') private client: ClientKafka,
  ) {}
  async onModuleInit() {
    this.client.subscribeToResponseOf('test');
    this.client.connect();
  }


  @MessagePattern('test')
  async getData( @Payload() query: Clause | Condition): Promise<Person[]> {

    this.logger.debug('Before call Application API')

    //return { message: "Hola desde infra" }
    return (await this.http.post<Person[]>('http://usecase-service/api/test', query).toPromise()).data;
    //return await this.cli.subscribe({ topics: ['test']}).then(async _ => {
    //  return (await this.http.post<Person[]>('http://usecase-service/api/test', query).toPromise()).data;
    //})
  }
}
