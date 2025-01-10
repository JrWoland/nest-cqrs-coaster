export class CoasterReportService {
  private readonly breakTimeInSeconds = 5 * 60; // Przerwa po przejechanej trasie (w sekundach)

  constructor(
    private coasterId: string,
    private stuffNumber: number,
    private wagonsNumber: number,
    private clientsNumber: number,
    private openingHour: string,
    private closingHour: string,
    private routeLength = 1000, // długość trasy w metrach
    private speed = 1.2, // prędkość w m/s
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

  private checkWagons(): string {
    if (this.neededWagons === this.wagonsNumber) return 'Status: OK';

    const wagonsAbs = Math.abs(this.neededWagons - this.wagonsNumber);

    if (this.neededWagons > this.wagonsNumber) {
      return `Status: ALERT - Brakuje ${Math.ceil(wagonsAbs)} wagonów.`;
    }
    if (this.neededWagons < this.wagonsNumber) {
      return `Status: ALERT - Nadmiar ${Math.ceil(wagonsAbs)} wagonów.`;
    }
  }

  private calculateCycleTime(): number {
    // Czas przejazdu trasy + czas przerwy na postój
    const routeTime = this.routeLength / this.speed; // w sekundach
    return routeTime + this.breakTimeInSeconds;
  }

  private calculateDailyCapacity(): number {
    const [openingHours, openingMinutes] = this.openingHour
      .split(':')
      .map(Number);
    const [closingHours, closingMinutes] = this.closingHour
      .split(':')
      .map(Number);

    const openingTimeInMinutes = openingHours * 60 + openingMinutes;
    const closingTimeInMinutes = closingHours * 60 + closingMinutes;

    const totalOperationTimeInSeconds =
      (closingTimeInMinutes - openingTimeInMinutes) * 60;

    const cycleTime = this.calculateCycleTime();

    // Obliczamy liczbę klientów dziennie na podstawie cyklu i liczby wagonów (liczba pasażerów = wagonsNumber * pojemność)
    const passengersPerCycle = this.wagonsNumber * 10; // Zakładamy 10 pasażerów na wagon
    const cyclesPerDay = Math.floor(totalOperationTimeInSeconds / cycleTime);

    return cyclesPerDay * passengersPerCycle;
  }

  private checkCapacity(): string {
    const dailyCapacity = this.calculateDailyCapacity();

    if (this.clientsNumber <= dailyCapacity) {
      return 'Status: OK - wystarczająca pojemność.';
    } else {
      return `Status: ALERT - brakuje miejsc dla około ${this.clientsNumber - dailyCapacity} klientów dziennie.`;
    }
  }

  public generateReport() {
    const template = `
      [Kolejka ${this.coasterId}]
        Godziny działania: ${this.openingHour} - ${this.closingHour}
        Długość trasy: ${this.routeLength} m
        Prędkość: ${this.speed} m/s
        Liczba wagonów: ${this.wagonsNumber}
        Dostępny personel: ${this.stuffNumber}
        Klienci dziennie (zaplanowani): ${this.clientsNumber}
        Przewidywana przepustowość: ${this.calculateDailyCapacity()} osób dziennie
        Status personelu: ${this.checkStuff()}
        Status wagonów:  ${this.checkWagons()}
        Status przepustowości: ${this.checkCapacity()}
    `;

    return template.trim();
  }
}
