import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WagonAddedEvent } from './wagon-added.event';
import { SyncService } from 'src/sync-data/sync-coaster.service';

@EventsHandler(WagonAddedEvent)
export class WagonAddedHandler implements IEventHandler<WagonAddedEvent> {
  constructor(private syncData: SyncService) {}

  async handle(event: WagonAddedEvent) {
    console.log(
      `Wagon with ID ${event.wagonId} added to Coaster ${event.coasterId}`,
    );

    this.syncData.syncChanges();
  }
}
