import { Injectable } from '@nestjs/common';
import { Person, Clause, Condition } from '@my-workspace/domain';
import { HttpService } from '@nestjs/axios';
import { TranslatorService } from '../translator/translator.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private translator: TranslatorService,
    private http: HttpService
  ) {}

  async getData(query: Clause | Condition): Promise<Person[]> {

    /*
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
    */


    //return new Promise<Person[]>((resolve, reject) => {
      if (query) {
        const tQuery = this.translator.translate(query);

        return (await lastValueFrom(this.http.post<Person[]>('http://infra-service/api/dbreader', tQuery))).data;

      } else {
        return (await lastValueFrom(this.http.post<Person[]>('http://infra-service/api/dbreader',{} ))).data;
      }
    //});

  }
}
