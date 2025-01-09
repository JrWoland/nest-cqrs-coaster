import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterRegisterCommand } from './coaster-register.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';
import { Coaster } from 'src/coaster/models/coaster.model';
import { randomUUID } from 'node:crypto';

@CommandHandler(CoasterRegisterCommand)
export class RegisterNewCoasterHandler
  implements ICommandHandler<CoasterRegisterCommand>
{
  constructor(private repository: CoasterRepository) {}

  async execute(command: CoasterRegisterCommand) {
    Logger.log('CoasterRegisterCommand...', command);
    this.repository.save(
      new Coaster(
        randomUUID(),
        command.numberOfStuff,
        command.numberOfClients,
        command.openingHour,
        command.closeHour,
        command.routeLength,
      ),
    );
  }
}
