import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterRegisterCommand } from './coaster-register.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CoasterRegisterCommand)
export class RegisterNewCoasterHandler
  implements ICommandHandler<CoasterRegisterCommand>
{
  constructor() {}

  async execute(command: CoasterRegisterCommand) {
    Logger.log('CoasterRegisterCommand...', command);
  }
}
