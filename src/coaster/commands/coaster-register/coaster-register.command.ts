export class CoasterRegisterCommand {
  constructor(
    public readonly numberOfStuff: number,
    public readonly numberOfClients: number,
    public readonly routeLength: number,
    public readonly openingHour: string,
    public readonly closeHour: string,
    public readonly speed: number,
  ) {}
}
