import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WagonDeletedEvent } from './wagon-deleted.event';
import { SyncService } from 'src/sync-data/sync-coaster.service';

@EventsHandler(WagonDeletedEvent)
export class WagonDeletedHandler implements IEventHandler<WagonDeletedEvent> {
  constructor(private syncData: SyncService) {}

  async handle(event: WagonDeletedEvent) {
    console.log(
      `Wagon with ID ${event.wagonId} deleted from Coaster ${event.coasterId}`,
    );

    this.syncData.syncChanges();
  }
}
