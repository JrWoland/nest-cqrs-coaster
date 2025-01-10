import { Injectable } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { RedisClientType, createClient } from '@redis/client';

@Injectable()
export class SyncService {
  private redisClient: RedisClientType;

  constructor(private readonly localStorage: LocalStorageService) {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
  }

  async syncChanges(): Promise<void> {
    const changes = this.localStorage.getAllChanges();

    for (const change of changes) {
      this.redisClient.publish('data-sync', JSON.stringify(change));
    }

    this.localStorage.addChange([]);
  }
}
