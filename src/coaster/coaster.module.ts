import { CqrsModule } from '@nestjs/cqrs';
import { CoasterController } from './coaster.controller';
import { Module } from '@nestjs/common';
import { CoasterRepository } from './repository/coaster.repository';
import { RedisClientProvider } from 'src/redis-client.provider';
import { EventHandlers } from './events';
import { CommandHandlers } from './commands';

import { SyncModule } from 'src/sync-data/sync.module';
import { ReportScheduler } from './services/coasters-report-cheduler.service';
import { CoasterReportService } from './services/coaster-report.service';

@Module({
  imports: [CqrsModule, SyncModule],
  controllers: [CoasterController],
  providers: [
    CoasterRepository,
    RedisClientProvider,
    ReportScheduler,
    CoasterReportService,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class CoasterModule {}
