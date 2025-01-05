import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterWagonDeleteCommand } from './coaster-wagon-delete.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CoasterWagonDeleteCommand)
export class DeleteWagonFromCoasterHandler
  implements ICommandHandler<CoasterWagonDeleteCommand>
{
  constructor() {}

  async execute(command: CoasterWagonDeleteCommand) {
    Logger.log('CoasterWagonDeleteCommand...', command);
  }
}
