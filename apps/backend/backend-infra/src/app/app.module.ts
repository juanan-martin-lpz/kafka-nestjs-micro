import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { DbreaderController } from './dbreader/dbreader.controller';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test-infra',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'test-assets',
          },
          producer: {
            allowAutoTopicCreation: true,
            createPartitioner: Partitioners.DefaultPartitioner
          },
          run: {
            autoCommit: true,
            autoCommitInterval: 150
          }
        },
      },
    ]),
  ],
  controllers: [AppController, DbreaderController],
  providers: [AppService],
})
export class AppModule {}
