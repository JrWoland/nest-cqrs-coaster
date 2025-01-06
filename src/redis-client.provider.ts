import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisClientProvider {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    const redisHost = this.configService.get<string>('REDIS_HOST', 'localhost');
    const redisPort = this.configService.get<number>('REDIS_PORT', 6479);

    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: redisHost,
        port: redisPort,
      },
    });
  }

  getClient(): ClientProxy {
    return this.client;
  }
}
