import { CqrsModule } from '@nestjs/cqrs';
import { CoasterController } from './coaster.controller';
import { Module } from '@nestjs/common';
import { GetCoastersListHandler } from './queries/get-coasters.handler';
import { RegisterNewCoasterHandler } from './commands/coaster-register/coaster-register.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CoasterController],
  providers: [GetCoastersListHandler, RegisterNewCoasterHandler],
})
export class CoasterModule {}
