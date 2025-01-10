import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LeaderElectionService {
  private redisClient: RedisClientType;
  private readonly redisKey = 'node_presence:*';
  private readonly nodeLeader = 'node_leader';

  constructor() {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.redisClient.on('connect', () => {
      this.electLeader();
    });

    this.redisClient.connect().catch((err) => {
      console.error('Failed to connect to Redis leader service', err.message);
    });
  }

  async getActiveNodes(): Promise<any> {
    const keys = await this.redisClient.keys(this.redisKey);

    if (keys.length === 0) return;

    const values = await this.redisClient.mGet(keys);

    const nodes = values.map((node: string) => JSON.parse(node));
    return nodes;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async electLeader() {
    const nodes = await this.getActiveNodes();
    nodes.sort((x, y) => x.timestamp - y.timestamp);

    const leader = nodes[0]?.nodeId || null;
    this.redisClient.set(this.nodeLeader, leader);
    console.log(`${process.env.NODE_ID} vote for ${leader} leader`);
  }
}
