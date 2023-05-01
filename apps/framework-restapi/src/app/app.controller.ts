import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { map } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('TEST_MICROSERVICE') private producer: ClientKafka
  ) {}
  onModuleInit() {
    this.producer.subscribeToResponseOf('test');
  }

  @Get()
  async getData() {
    return await this.producer.send('test', {});
  }
}
