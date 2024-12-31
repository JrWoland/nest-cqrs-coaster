import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterWagonRegisterCommand } from './coaster-wagon-register.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CoasterWagonRegisterCommand)
export class RegisterNewWagonCoasterHandler
  implements ICommandHandler<CoasterWagonRegisterCommand>
{
  constructor() {}

  async execute(command: CoasterWagonRegisterCommand) {
    Logger.log('CoasterWagonRegisterCommand...', command);
  }
}
