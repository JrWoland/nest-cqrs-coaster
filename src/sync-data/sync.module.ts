import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { SyncService } from './sync-coaster.service';

@Module({
  providers: [LocalStorageService, SyncService],
  exports: [],
})
export class SyncModule {}
