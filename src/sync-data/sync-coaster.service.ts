import { Injectable, Logger } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { RedisClientType, createClient } from '@redis/client';

@Injectable()
export class SyncService {
  private redisClient: RedisClientType;
  private isConnected = false;
  constructor(private readonly localStorage: LocalStorageService) {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.redisClient.on('connect', () => {
      console.log('Redis data-sync service connected');
      this.isConnected = true;
    });

    this.redisClient.on('end', () => {
      this.isConnected = false;
      console.error('Redis connection lost data-sync sync service');
    });

    this.redisClient.on('error', (err) => {
      if (this.isConnected)
        console.error('Redis data-sync sync service error:', err.message);
      this.isConnected = false;
    });

    this.redisClient.connect().catch((err) => {
      console.error(
        'Failed to connect to Redis data-sync service',
        err.message,
      );
    });
  }

  async syncChanges(): Promise<void> {
    if (!this.isConnected) {
      return Logger.log(`Data could not be synchronized. Connection lost.`);
    }
    Logger.log(`Synchronizing data.`);
    const changes = this.localStorage.getAllChanges();

    for (const [key, value] of Object.entries(changes)) {
      this.redisClient.publish('data-sync', JSON.stringify({ key, value }));
    }

    this.localStorage.saveData({});
  }
}
