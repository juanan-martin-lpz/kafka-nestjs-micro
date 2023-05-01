import { Injectable } from '@nestjs/common';
import { Person, Clause, Condition } from '@my-workspace/domain';
import { HttpService } from '@nestjs/axios';
import { TranslatorService } from '../translator/translator.service';

@Injectable()
export class AppService {
  constructor(
    private translator: TranslatorService,
    private http: HttpService
  ) {}

  async getData(query: Clause | Condition | null): Promise<Person[]> {
    return new Promise<Person[]>((resolve, reject) => {
      if (query) {
        const tQuery = this.translator.translate(query);

        this.http
          .post<unknown>('http://infra-service/api/dbreader', tQuery)
          .subscribe((response) => {
            resolve([]);
          });
      } else {
        this.http
          .post<unknown>('http://infra-service/api/dbreader', {})
          .subscribe((response) => {
            resolve([]);
          });
      }
    });
  }
}
