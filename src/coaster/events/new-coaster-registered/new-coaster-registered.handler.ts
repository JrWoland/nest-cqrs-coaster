import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewCoasterRegisteredEvent } from './new-coaster-registered.event';
import { RedisClientProvider } from 'src/redis-client.provider';

@EventsHandler(NewCoasterRegisteredEvent)
export class NewCoasterRegisteredHandler
  implements IEventHandler<NewCoasterRegisteredEvent>
{
  constructor(private redisClientProvider: RedisClientProvider) {}

  async handle(event: NewCoasterRegisteredEvent) {
    console.log(`Coaster with ID ${event.coasterId} registered`);
    // Additional logic for handling the event

    await this.redisClientProvider
      .getClient()
      .send('sync_coaster', {
        coasterId: event.coasterId,
      })
      .toPromise();
  }
}
