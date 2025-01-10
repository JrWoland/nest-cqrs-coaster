import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class NodeRegistrationService implements OnModuleDestroy {
  private redisClient: RedisClientType;
  private nodeId = `node_presence:${process.env.NODE_ID}`;
  private interval: ReturnType<typeof setInterval>;

  constructor() {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.redisClient.on('connect', () => {
      this.registerNode();
    });

    this.redisClient.connect().catch((err) => {
      console.error('Failed to connect to Redis leader service', err.message);
    });
  }

  async onModuleDestroy() {
    await this.removeNode();
    clearInterval(this.interval);
  }

  async onModuleInit() {
    this.interval = setInterval(() => this.sendHeartbeat(), 5000); // Wysyłanie heartbeat co 5 sekund
  }

  private registerNode(): void {
    const payload = JSON.stringify({
      nodeId: this.nodeId,
      timestamp: Date.now(),
    });
    this.redisClient.set(this.nodeId, payload);
    Logger.log(`Node registered: ${this.nodeId}`);
  }

  private async removeNode() {
    await this.redisClient.del(this.nodeId);
  }

  private sendHeartbeat(): void {
    this.redisClient.expire(this.nodeId, 10); // Utrzymanie klucza przy aktywności
  }
}
