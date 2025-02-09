import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoasterModule } from './coaster/coaster.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { createLoggerConfig } from './logger.config';
import { HealthModule } from './health/health.module';
import { LeaderElectionModule } from './leader-election-module/leader-election.module';

@Module({
  imports: [
    CoasterModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    WinstonModule.forRootAsync({
      useFactory: () => {
        const environment = process.env.NODE_ENV || 'development';
        return createLoggerConfig(environment);
      },
    }),
    LeaderElectionModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
