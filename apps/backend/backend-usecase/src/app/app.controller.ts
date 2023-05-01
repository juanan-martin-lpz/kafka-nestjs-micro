import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Clause, Condition } from '@my-workspace/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getData(query: Clause | Condition | null) {
    return this.appService.getData(query);
  }
}
