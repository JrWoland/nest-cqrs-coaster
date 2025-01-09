export class WagonDeletedEvent {
  constructor(
    public readonly coasterId: string,
    public readonly wagonId: string,
  ) {}
}
