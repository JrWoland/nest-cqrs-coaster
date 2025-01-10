import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CoasterWagonDeleteCommand } from './coaster-wagon-delete.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';
import { WagonDeletedEvent } from 'src/coaster/events/wagon-deleted/wagon-deleted.event';

@CommandHandler(CoasterWagonDeleteCommand)
export class DeleteWagonFromCoasterHandler
  implements ICommandHandler<CoasterWagonDeleteCommand>
{
  constructor(
    private repository: CoasterRepository,
    private publisher: EventPublisher,
    private eventBus: EventBus,
  ) {}

  async execute(command: CoasterWagonDeleteCommand) {
    Logger.log('CoasterWagonDeleteCommand...', command);

    const coasterAggregate = await this.repository.findCoasterById(
      command.coasterId,
    );

    if (!coasterAggregate) return;

    const coaster = this.publisher.mergeObjectContext(coasterAggregate);

    coaster.deleteWagon(command.wagonId);

    await this.repository.save(coaster);

    this.eventBus.publish(
      new WagonDeletedEvent(command.coasterId, command.wagonId),
    );
  }
}
