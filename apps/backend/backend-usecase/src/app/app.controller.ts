import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import { Clause, Condition } from '@my-workspace/domain';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('TEST_MICROSERVICE') private producer: ClientKafka  ) {}

  @MessagePattern('test')
  async getData(query: Clause | Condition | null) {

    return await lastValueFrom(this.producer.send('personas', JSON.stringify(query)))
    //return this.appService.getData(query);
  }
}
