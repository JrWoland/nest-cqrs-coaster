export class CoasterWagonDeleteCommand {
  constructor(
    public readonly coasterId: string,
    public readonly wagonId: string,
  ) {}
}
