import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CoasterInfoUpdatedEvent } from './coaster-info-updated.event';
import { SyncService } from 'src/sync-data/sync-coaster.service';

@EventsHandler(CoasterInfoUpdatedEvent)
export class CoasterInfoUpdatedHandler
  implements IEventHandler<CoasterInfoUpdatedEvent>
{
  constructor(private syncData: SyncService) {}

  async handle(event: CoasterInfoUpdatedEvent) {
    console.log(`Coaster with ID ${event.coasterId} updated`);
    this.syncData.syncChanges();
  }
}
