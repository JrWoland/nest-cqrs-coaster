import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CoasterInfoUpdatedEvent } from './coaster-info-updated.event';

@EventsHandler(CoasterInfoUpdatedEvent)
export class CoasterInfoUpdatedHandler
  implements IEventHandler<CoasterInfoUpdatedEvent>
{
  handle(event: CoasterInfoUpdatedEvent) {
    console.log(`Coaster with ID ${event.coasterId} updated`);
    // Additional logic for handling the event
  }
}
