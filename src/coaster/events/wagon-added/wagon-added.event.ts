export class WagonAddedEvent {
  constructor(
    public readonly coasterId: string,
    public readonly wagonId: string,
  ) {}
}
