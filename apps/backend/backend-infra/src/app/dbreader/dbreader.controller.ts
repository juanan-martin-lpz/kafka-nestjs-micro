import { Clause, Condition, Person } from '@my-workspace/domain';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('dbreader')
export class DbreaderController implements OnModuleInit {
  constructor(@Inject('TEST_MICROSERVICE') private producer: ClientKafka) {}

  onModuleInit() {
    this.producer.subscribeToResponseOf('personas');
    this.producer.connect();
  }


  @Post()
  async getData(@Body() query: Clause | Condition): Promise<Person[]> {

    return [
      {
        id: "0001",
        first_name: "Juan",
        last_name: "Martin",
        address: {
          id: "00001",
          country: "Spain",
          province: "Madrid",
          city: "Fuenlabrada",
          street: "Avenida",
          street_line: "del Hospital"
        }
      }
    ]

    /*
    //return new Promise<unknown>((resolve, reject) => {
      if (query) {
        return lastValueFrom(this.producer.send('personas', query))

      } else {
        return lastValueFrom(this.producer.send('personas', {}))
      }
    //});
    */
  }
}

