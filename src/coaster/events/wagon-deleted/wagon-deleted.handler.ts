import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WagonDeletedEvent } from './wagon-deleted.event';

@EventsHandler(WagonDeletedEvent)
export class WagonDeletedHandler implements IEventHandler<WagonDeletedEvent> {
  handle(event: WagonDeletedEvent) {
    console.log(
      `Wagon with ID ${event.wagonId} deleted from Coaster ${event.coasterId}`,
    );
    // Additional logic for handling the event
  }
}
