import { AggregateRoot } from '@nestjs/cqrs';
import { UUID } from 'node:crypto';
import { Wagon } from './wagon.model';

export class Coaster extends AggregateRoot {
  constructor(
    public readonly id: UUID,
    private stuffNumber: number,
    private clientsNumber: number,
    private openingHour: string,
    private closingHour: string,
    private routeLength: number,
    private wagons: Wagon[] = [],
    private speed: number,
  ) {
    super();
    this.autoCommit = true;
  }

  public updateCoasterInformations({
    stuffNumber,
    clientsNumber,
    openingHour,
    closingHour,
    speed,
  }) {
    this.stuffNumber = stuffNumber;
    this.clientsNumber = clientsNumber;
    this.openingHour = openingHour;
    this.closingHour = closingHour;
    this.speed = speed;
  }

  public addWagon(wagon: Wagon) {
    this.wagons.push(wagon);
  }

  public deleteWagon(wagonId: string) {
    this.wagons = this.wagons.filter((i) => i.id !== wagonId);
  }
}
