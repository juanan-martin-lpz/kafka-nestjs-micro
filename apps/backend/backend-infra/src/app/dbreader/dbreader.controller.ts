import { Clause, Condition } from '@my-workspace/domain';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('dbreader')
export class DbreaderController implements OnModuleInit {
  constructor(@Inject('TEST_MICROSERVICE') private producer: ClientKafka) {}

  onModuleInit() {
    this.producer.subscribeToResponseOf('personas');
  }

  @Post()
  async getData(@Body() query: Clause | Condition | null): Promise<unknown> {
    return new Promise<unknown>((resolve, reject) => {
      if (query) {
        this.producer.send('personas', query).subscribe((response) => {
          resolve(response);
        });
      } else {
        this.producer.send('personas', {}).subscribe((response) => {
          resolve(response);
        });
      }
    });
  }
}
