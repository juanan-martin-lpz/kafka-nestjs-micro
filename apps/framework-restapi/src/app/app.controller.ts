import { Controller, Get, Inject, Logger, OnModuleInit } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Condition } from '@my-workspace/domain';
import { Producer } from 'kafkajs';

@Controller()
export class AppController implements OnModuleInit {

  private logger: Logger = new Logger('[Framework]');

  private c: Condition = {
    name: 'test',
    operator: 'equal',
    value: '1'
  }

   constructor(
    private readonly appService: AppService,
    @Inject('TEST_MICROSERVICE') private producer: ClientKafka,
  ) {}

  onModuleInit() {
    this.producer.subscribeToResponseOf('test')
    this.producer.connect();
  }

  @Get('test')
  async getData() {
    this.logger.debug('getData')
    return this.producer.send('test', this.c);
  }
}
