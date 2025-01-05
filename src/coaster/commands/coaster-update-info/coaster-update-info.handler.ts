import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterUpdateInformationsCommand } from './coaster-update-info.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CoasterUpdateInformationsCommand)
export class UpdateCoasterInfoHandler
  implements ICommandHandler<CoasterUpdateInformationsCommand>
{
  constructor() {}

  async execute(command: CoasterUpdateInformationsCommand) {
    Logger.log('CoasterUpdateCommand...', command);
  }
}
