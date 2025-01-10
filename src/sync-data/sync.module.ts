import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { SyncService } from './sync-coaster.service';
import { DataSyncListener } from './data-sync.listener';

@Module({
  providers: [LocalStorageService, SyncService, DataSyncListener],
  exports: [SyncService],
})
export class SyncModule {}
