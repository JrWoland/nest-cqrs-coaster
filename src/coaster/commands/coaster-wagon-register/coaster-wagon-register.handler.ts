import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterWagonRegisterCommand } from './coaster-wagon-register.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';
import { Wagon } from 'src/coaster/models/wagon.model';
import { randomUUID } from 'node:crypto';

@CommandHandler(CoasterWagonRegisterCommand)
export class RegisterNewWagonCoasterHandler
  implements ICommandHandler<CoasterWagonRegisterCommand>
{
  constructor(private repository: CoasterRepository) {}

  async execute(command: CoasterWagonRegisterCommand) {
    Logger.log('CoasterWagonRegisterCommand...', command);

    const coaster = await this.repository.findCoasterById(command.coasterId);

    if (!coaster) return;

    const wagon = new Wagon(randomUUID(), command.numberOfPlaces);

    coaster.addWagon(wagon);

    this.repository.save(coaster);
  }
}
