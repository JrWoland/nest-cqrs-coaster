import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoasterModule } from './coaster/coaster.module';

@Module({
  imports: [CoasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
