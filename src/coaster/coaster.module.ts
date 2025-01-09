import { CqrsModule } from '@nestjs/cqrs';
import { CoasterController } from './coaster.controller';
import { Module } from '@nestjs/common';
import { CoasterRepository } from './repository/coaster.repository';
import { RedisMicroserviceModule } from 'src/redis-microservice/redis-microservice.module';
import { RedisClientProvider } from 'src/redis-client.provider';
import { EventHandlers } from './events';
import { CommandHandlers } from './commands';

@Module({
  imports: [CqrsModule, RedisMicroserviceModule],
  controllers: [CoasterController],
  providers: [
    CoasterRepository,
    RedisClientProvider,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class CoasterModule {}
