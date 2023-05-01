import { Controller, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

import { Clause, Condition, Person } from '@my-workspace/domain';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TEST_MICROSERVICE') private client: ClientKafka,
    private http: HttpService
  ) {}

  @MessagePattern('test')
  async getData(query: Clause | Condition | null): Promise<Person[]> {
    return new Promise<Person[]>((resolve, reject) => {
      this.http
        .post<Person[]>('http://usecase-service/api/test', query)
        .subscribe((response) => {
          resolve(response.data);
        });
    });
  }
}
