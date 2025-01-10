import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CoasterWagonRegisterCommand } from './coaster-wagon-register.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';
import { Wagon } from 'src/coaster/models/wagon.model';
import { randomUUID } from 'node:crypto';
import { WagonAddedEvent } from 'src/coaster/events/wagon-added/wagon-added.event';

@CommandHandler(CoasterWagonRegisterCommand)
export class RegisterNewWagonCoasterHandler
  implements ICommandHandler<CoasterWagonRegisterCommand>
{
  constructor(
    private repository: CoasterRepository,
    private publisher: EventPublisher,
    private eventBus: EventBus,
  ) {}

  async execute(command: CoasterWagonRegisterCommand) {
    Logger.log('CoasterWagonRegisterCommand...', command);

    const coasterAggregate = await this.repository.findCoasterById(
      command.coasterId,
    );

    if (!coasterAggregate) return;

    const coaster = this.publisher.mergeObjectContext(coasterAggregate);

    const wagon = new Wagon(randomUUID(), command.numberOfPlaces);

    coaster.addWagon(wagon);

    await this.repository.save(coaster);

    this.eventBus.publish(new WagonAddedEvent(command.coasterId, wagon.id));
  }
}
