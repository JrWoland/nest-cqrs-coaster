import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private client: RedisClientType;
  private isConnected = false;

  constructor() {
    super();

    this.client = createClient({ url: 'redis://localhost:6479' });

    this.client.on('connect', () => {
      this.isConnected = true;
      console.log('Redis connected');
    });

    this.client.on('end', () => {
      this.isConnected = false;
      console.error('Redis connection lost');
    });

    this.client.on('error', (err) => {
      if (this.isConnected) console.error('Redis error:', err.message);
      this.isConnected = false;
    });

    this.client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err.message);
    });
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    if (!this.isConnected) {
      return this.getStatus(key, false, { error: 'DISCONNECTED' });
    }

    try {
      await this.client.ping();

      return this.getStatus(key, true);
    } catch (error) {
      return this.getStatus(key, false, { error: error.message });
    }
  }
}
