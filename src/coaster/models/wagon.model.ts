export class Wagon {
  constructor(
    public readonly id: string,
    private readonly maxCapacity: number,
    private _passengers = 0,
  ) {}

  get passengersAmount() {
    return this._passengers;
  }

  assignPassengers(passengers: number) {
    if (this.maxCapacity < passengers) {
      console.log('Capacity exceeded');
    }
    this._passengers = passengers;
  }
}
