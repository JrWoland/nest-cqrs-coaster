import { Injectable, Logger } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { RedisClientType, createClient } from '@redis/client';

@Injectable()
export class DataSyncListener {
  private redisClient: RedisClientType;
  private isConnected = false;

  constructor(private readonly localStorage: LocalStorageService) {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.redisClient.on('connect', () => {
      console.log('Redis data-sync listener connected');
      this.isConnected = true;
      this.redisClient.subscribe('data-sync', (message, channel) => {
        if (channel === 'data-sync') {
          this.handleSyncEvent(JSON.parse(message));
        }
      });
    });

    this.redisClient.on('end', () => {
      this.isConnected = false;
      console.error('Redis connection lost data-sync listener service');
    });

    this.redisClient.on('error', (err) => {
      if (this.isConnected)
        console.error('Redis data-sync listener service error:', err.message);
      this.isConnected = false;
    });

    this.redisClient.connect().catch((err) => {
      console.error(
        'Failed to connect to Redis data-sync listener service:',
        err.message,
      );
    });
  }

  private handleSyncEvent(change: any): void {
    Logger.log(`Received data: ${change.key}`);
    const data = this.localStorage.getAllChanges();

    data[change.key] = change.value;

    this.localStorage.saveData(data);
  }
}
