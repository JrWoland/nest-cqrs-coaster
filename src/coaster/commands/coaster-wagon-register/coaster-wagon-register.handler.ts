import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterWagonRegisterCommand } from './coaster-wagon-register.command';

@CommandHandler(CoasterWagonRegisterCommand)
export class RegisterNewWagonCoasterHandler
  implements ICommandHandler<CoasterWagonRegisterCommand>
{
  constructor() {}

  async execute(command: CoasterWagonRegisterCommand) {
    console.log('CoasterWagonRegisterCommand...', command);
  }
}
