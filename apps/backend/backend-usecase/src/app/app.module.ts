import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TranslatorService } from '../translator/translator.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test-application',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'test-assets',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TranslatorService],
})
export class AppModule {}
