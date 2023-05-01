export class Address {
  id: string;
  country: string;
  province: string;
  city: string;
  street: string;
  street_line: string;

  constructor(id: string, country: string, province: string, city: string, street: string, street_line: string) {
    this.id = id;
    this.country = country;
    this.province = province;
    this.city = city;
    this.street = street;
    this.street_line = street_line;
  }

}

export class Person {
  id: string;
  first_name: string;
  last_name: string;
  address: Address | null = null;

  constructor(id: string, first_name: string, last_name: string, address: Address) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;

    if (address) {
      this.address = address;
    }
  }
}

export type Operator = 'greaterThan' | 'lessThan' | 'equal';
export type Joiner = 'and' | 'or';
export type Condition = {
  name: string;
  operator: Operator;
  value: string;
};

export type Clause = {
  joiner: Joiner;
  conditions: Condition[] | Clause[];
};
