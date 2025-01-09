import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterUpdateInformationsCommand } from './coaster-update-info.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';

@CommandHandler(CoasterUpdateInformationsCommand)
export class UpdateCoasterInfoHandler
  implements ICommandHandler<CoasterUpdateInformationsCommand>
{
  constructor(private repository: CoasterRepository) {}

  async execute(command: CoasterUpdateInformationsCommand) {
    Logger.log('CoasterUpdateCommand...', command);

    const coaster = await this.repository.findCoasterById(command.coasterId);

    if (!coaster) return;

    coaster.updateCoasterInformations({
      stuffNumber: command.numberOfStuff,
      clientsNumber: command.numberOfClients,
      closingHour: command.closeHour,
      openingHour: command.openingHour,
    });

    this.repository.save(coaster);
  }
}
