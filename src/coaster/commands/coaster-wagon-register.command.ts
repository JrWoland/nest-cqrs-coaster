// pomijam `predkosc_wagonu` gdyż wydaje mi się że to powinno być uwzglednione w ustawieniach Coastera
export class CoasterWagonRegisterCommand {
  constructor(public readonly numberOfPlaces: number) {}
}
