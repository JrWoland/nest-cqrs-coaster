import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterRegisterCommand } from './coaster-register.command';

@CommandHandler(CoasterRegisterCommand)
export class RegisterNewCoasterHandler
  implements ICommandHandler<CoasterRegisterCommand>
{
  constructor() {}

  async execute(command: CoasterRegisterCommand) {
    console.log('CoasterRegisterCommand...', command);
  }
}
