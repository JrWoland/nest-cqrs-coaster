import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CoasterRegisterDto } from './interfaces/coaster-register-dto.interface';
import { CoasterRegisterCommand } from './commands/coaster-register/coaster-register.command';
import { GetCoastersListQuery } from './queries/get-coasters.query';
import { CoasterWagonRegisterDto } from './interfaces/coaster-register-dto.interface copy';
import { CoasterWagonRegisterCommand } from './commands/coaster-wagon-register.command';

@Controller('coasters')
export class CoasterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async registerNewCoaster(@Body() dto: CoasterRegisterDto) {
    return this.commandBus.execute(
      new CoasterRegisterCommand(
        dto.liczba_personelu,
        dto.liczba_klientow,
        dto.dl_trasy,
        dto.godziny_od,
        dto.godziny_do,
      ),
    );
  }

  @Get('')
  async getCoastersList(): Promise<any[]> {
    return this.queryBus.execute(new GetCoastersListQuery());
  }

  @Post(':coasterId/wagons')
  async addWagonToCoaster(@Body() dto: CoasterWagonRegisterDto) {
    return this.commandBus.execute(
      new CoasterWagonRegisterCommand(dto.liczba_miejsc),
    );
  }
}
