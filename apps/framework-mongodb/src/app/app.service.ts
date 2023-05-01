import { Person } from '@my-workspace/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): Person[] {
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
  }
}
