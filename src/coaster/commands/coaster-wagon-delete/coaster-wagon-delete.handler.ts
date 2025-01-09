import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoasterWagonDeleteCommand } from './coaster-wagon-delete.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';

@CommandHandler(CoasterWagonDeleteCommand)
export class DeleteWagonFromCoasterHandler
  implements ICommandHandler<CoasterWagonDeleteCommand>
{
  constructor(private repository: CoasterRepository) {}

  async execute(command: CoasterWagonDeleteCommand) {
    Logger.log('CoasterWagonDeleteCommand...', command);

    const coaster = await this.repository.findCoasterById(command.coasterId);

    if (!coaster) return;

    coaster.deleteWagon(command.wagonId);

    this.repository.save(coaster);
  }
}
