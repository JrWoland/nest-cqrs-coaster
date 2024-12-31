import { AggregateRoot } from '@nestjs/cqrs';

export class Coaster extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly wagonsNumber: number,
    private readonly stuffNumber: number,
    private readonly clientsNumber: number,
    private readonly openingHour: string,
    private readonly closingHour: string,
  ) {
    super();
  }

  addWagon(wagon: string) {
    console.log(wagon, 'ADDED');

    // logic
  }

  deleteWagon(wagon: string) {
    console.log(wagon, 'DELETED');

    // logic
  }
}
