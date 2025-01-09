import { CqrsModule } from '@nestjs/cqrs';
import { CoasterController } from './coaster.controller';
import { Module } from '@nestjs/common';
import { GetCoastersListHandler } from './queries/get-coasters.handler';
import { RegisterNewCoasterHandler } from './commands/coaster-register/coaster-register.handler';
import { RegisterNewWagonCoasterHandler } from './commands/coaster-wagon-register/coaster-wagon-register.handler';
import { DeleteWagonFromCoasterHandler } from './commands/coaster-wagon-delete/coaster-wagon-delete.handler';
import { UpdateCoasterInfoHandler } from './commands/coaster-update-info/coaster-update-info.handler';
import { CoasterRepository } from './repository/coaster.repository';
import { RedisMicroserviceModule } from 'src/redis-microservice/redis-microservice.module';
import { RedisClientProvider } from 'src/redis-client.provider';
import { EventHandlers } from './events';

@Module({
  imports: [CqrsModule, RedisMicroserviceModule],
  controllers: [CoasterController],
  providers: [
    GetCoastersListHandler,
    RegisterNewCoasterHandler,
    RegisterNewWagonCoasterHandler,
    DeleteWagonFromCoasterHandler,
    UpdateCoasterInfoHandler,
    CoasterRepository,
    RedisClientProvider,
    ...EventHandlers,
  ],
})
export class CoasterModule {}
