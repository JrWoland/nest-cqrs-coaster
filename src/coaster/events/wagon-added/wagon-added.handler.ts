import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WagonAddedEvent } from './wagon-added.event';

@EventsHandler(WagonAddedEvent)
export class WagonAddedHandler implements IEventHandler<WagonAddedEvent> {
  handle(event: WagonAddedEvent) {
    console.log(
      `Wagon with ID ${event.wagonId} added to Coaster ${event.coasterId}`,
    );
    // Additional logic for handling the event
  }
}
