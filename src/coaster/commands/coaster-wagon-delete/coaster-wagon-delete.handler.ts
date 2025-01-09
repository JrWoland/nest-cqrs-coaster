import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CoasterWagonDeleteCommand } from './coaster-wagon-delete.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';

@CommandHandler(CoasterWagonDeleteCommand)
export class DeleteWagonFromCoasterHandler
  implements ICommandHandler<CoasterWagonDeleteCommand>
{
  constructor(
    private repository: CoasterRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CoasterWagonDeleteCommand) {
    Logger.log('CoasterWagonDeleteCommand...', command);

    const coasterAggregate = await this.repository.findCoasterById(
      command.coasterId,
    );

    if (!coasterAggregate) return;

    const coaster = this.publisher.mergeObjectContext(coasterAggregate);

    coaster.deleteWagon(command.wagonId);

    this.repository.save(coaster);
  }
}
