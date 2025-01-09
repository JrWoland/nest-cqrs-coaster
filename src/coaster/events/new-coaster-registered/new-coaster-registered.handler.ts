import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewCoasterRegisteredEvent } from './new-coaster-registered.event';

@EventsHandler(NewCoasterRegisteredEvent)
export class NewCoasterRegisteredHandler
  implements IEventHandler<NewCoasterRegisteredEvent>
{
  handle(event: NewCoasterRegisteredEvent) {
    console.log(`Coaster with ID ${event.coasterId} registered`);
    // Additional logic for handling the event
  }
}
