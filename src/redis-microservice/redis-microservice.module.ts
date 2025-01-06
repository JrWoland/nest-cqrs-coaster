import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisMicroserviceController } from './redis-microservice.controller';

@Module({
  imports: [ConfigModule],
  controllers: [RedisMicroserviceController],
})
export class RedisMicroserviceModule {}
