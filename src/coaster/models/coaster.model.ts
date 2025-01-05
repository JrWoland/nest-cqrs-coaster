import { AggregateRoot } from '@nestjs/cqrs';
import { UUID } from 'node:crypto';

export class Coaster extends AggregateRoot {
  constructor(
    public readonly id: UUID,
    private readonly wagonsNumber: number,
    private readonly stuffNumber: number,
    private readonly clientsNumber: number,
    private readonly openingHour: string,
    private readonly closingHour: string,
    private readonly routeLength: number,
  ) {
    super();
    this.autoCommit = true;
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
