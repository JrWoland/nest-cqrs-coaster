export class CoasterReportService {
  constructor(
    private coasterId: string,
    private stuffNumber: number,
    private wagonsNumber: number,
    private clientsNumber: number,
    private openingHour: string,
    private closingHour: string,
    private routeLength: string,
    private speed: string,
  ) {}

  get neededStuff() {
    return 1 + this.wagonsNumber * 2;
  }

  get neededWagons() {
    return (this.stuffNumber - 1) / 2;
  }

  private checkStuff(): string {
    if (this.neededStuff === this.stuffNumber) return 'Status: OK';

    const stuffAbs = Math.abs(this.neededStuff - this.stuffNumber);

    if (this.neededStuff > this.stuffNumber) {
      return `Brakuje ${stuffAbs} pracowników.`;
    }
    if (this.neededStuff < this.stuffNumber) {
      return `Nadmiar ${stuffAbs} pracowników.`;
    }
  }

  checkWagons() {
    if (this.neededWagons === this.wagonsNumber) return 'OK';

    const wagonsAbs = Math.abs(this.neededWagons - this.wagonsNumber);

    if (this.neededWagons > this.wagonsNumber) {
      return `Brakuje ${Math.ceil(wagonsAbs)} wagonów.`;
    }
    if (this.neededWagons < this.wagonsNumber) {
      return `Nadmiar ${Math.ceil(wagonsAbs)} wagonów.`;
    }
  }

  public generateReport() {
    const template = `
      [Kolejka ${this.coasterId}]
        Godziny działania: ${this.openingHour} - ${this.closingHour}
        Liczba wagonów: ${this.wagonsNumber}
        Dostępny personel: ${this.stuffNumber}
        Klienci dziennie: ${this.clientsNumber}
        Status pracowników: ${this.checkStuff()}
        Status wagonów:  ${this.checkWagons()}
    `;

    return template;
  }
}
