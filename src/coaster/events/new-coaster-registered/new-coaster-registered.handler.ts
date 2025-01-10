import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewCoasterRegisteredEvent } from './new-coaster-registered.event';
import { SyncService } from 'src/sync-data/sync-coaster.service';

@EventsHandler(NewCoasterRegisteredEvent)
export class NewCoasterRegisteredHandler
  implements IEventHandler<NewCoasterRegisteredEvent>
{
  constructor(private syncData: SyncService) {}

  async handle(event: NewCoasterRegisteredEvent) {
    console.log(`Coaster with ID ${event.coasterId} registered`);
    await this.syncData.syncChanges();
  }
}
