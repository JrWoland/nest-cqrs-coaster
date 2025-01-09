import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CoasterRegisterCommand } from './coaster-register.command';
import { Logger } from '@nestjs/common';
import { CoasterRepository } from 'src/coaster/repository/coaster.repository';
import { Coaster } from 'src/coaster/models/coaster.model';
import { randomUUID } from 'node:crypto';
import { NewCoasterRegisteredEvent } from 'src/coaster/events/new-coaster-registered/new-coaster-registered.event';

@CommandHandler(CoasterRegisterCommand)
export class RegisterNewCoasterHandler
  implements ICommandHandler<CoasterRegisterCommand>
{
  constructor(
    private repository: CoasterRepository,
    private eventBus: EventBus,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CoasterRegisterCommand) {
    Logger.log('CoasterRegisterCommand...', command);

    const id = randomUUID();

    const coaster = new Coaster(
      id,
      command.numberOfStuff,
      command.numberOfClients,
      command.openingHour,
      command.closeHour,
      command.routeLength,
    );

    this.eventBus.publish(new NewCoasterRegisteredEvent(id));
    this.repository.save(coaster);
  }
}
