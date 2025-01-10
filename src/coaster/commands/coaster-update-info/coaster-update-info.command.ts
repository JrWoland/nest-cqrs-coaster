export class CoasterUpdateInformationsCommand {
  constructor(
    public readonly coasterId: string,
    public readonly numberOfStuff: number,
    public readonly numberOfClients: number,
    public readonly openingHour: string,
    public readonly closeHour: string,
    public readonly speed: number,
  ) {}
}
