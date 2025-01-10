import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CoasterRegisterDto } from './interfaces/coaster-register-dto.interface';
import { CoasterRegisterCommand } from './commands/coaster-register/coaster-register.command';
import { GetCoastersListQuery } from './queries/get-coasters.query';
import { CoasterWagonRegisterDto } from './interfaces/coaster-register-wagon-dto.interface';
import { CoasterWagonRegisterCommand } from './commands/coaster-wagon-register/coaster-wagon-register.command';
import { CoasterWagonDeleteCommand } from './commands/coaster-wagon-delete/coaster-wagon-delete.command';
import { CoasterUpdateInformationsDto } from './interfaces/coaster-update-informations-dto.interface';
import { CoasterUpdateInformationsCommand } from './commands/coaster-update-info/coaster-update-info.command';

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
        dto.predkosc,
      ),
    );
  }

  @Get('')
  async getCoastersList(): Promise<any[]> {
    return this.queryBus.execute(new GetCoastersListQuery());
  }

  @Post(':coasterId/wagons')
  async addWagonToCoaster(
    @Param('coasterId') coasterId: string,
    @Body() dto: CoasterWagonRegisterDto,
  ) {
    return this.commandBus.execute(
      new CoasterWagonRegisterCommand(coasterId, dto.liczba_miejsc),
    );
  }

  @Put(':coasterId')
  async updateCoasterInformation(
    @Param('coasterId') coasterId: string,
    @Body() dto: CoasterUpdateInformationsDto,
  ) {
    return this.commandBus.execute(
      new CoasterUpdateInformationsCommand(
        coasterId,
        dto.liczba_personelu,
        dto.liczba_klientow,
        dto.godziny_od,
        dto.godziny_do,
        dto.predkosc,
      ),
    );
  }

  @Delete(':coasterId/wagons/:wagonId')
  async deleteWagonFromCoaster(
    @Param('coasterId') coasterId: string,
    @Param('wagonId') wagonId: string,
  ) {
    return this.commandBus.execute(
      new CoasterWagonDeleteCommand(coasterId, wagonId),
    );
  }
}
