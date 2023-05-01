import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { DbreaderController } from './dbreader/dbreader.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'test-assets',
          },
        },
      },
      HttpModule,
    ]),
  ],
  controllers: [AppController, DbreaderController],
  providers: [AppService],
})
export class AppModule {}
