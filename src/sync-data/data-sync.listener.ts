import { Injectable } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { RedisClientType, createClient } from '@redis/client';

@Injectable()
export class DataSyncListener {
  private redisClient: RedisClientType;

  constructor(private readonly localStorage: LocalStorageService) {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.redisClient.subscribe('data-sync', (message, channel) => {
      if (channel === 'data-sync') {
        this.handleSyncEvent(JSON.parse(message));
      }
    });
  }

  private handleSyncEvent(change: any): void {}
}
