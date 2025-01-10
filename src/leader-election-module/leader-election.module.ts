import { Module } from '@nestjs/common';
import { NodeRegistrationService } from './node-register.service';
import { LeaderElectionService } from './leader-election.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [NodeRegistrationService, LeaderElectionService],
  exports: [NodeRegistrationService, LeaderElectionService],
})
export class LeaderElectionModule {}
