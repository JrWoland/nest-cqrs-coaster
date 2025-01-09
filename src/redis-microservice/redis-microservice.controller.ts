import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RedisMicroserviceController {
  @MessagePattern('default_channel')
  handleMessage(data: any) {
    Logger.log(`Received from Redis: ${data}`);
    return { ack: true, received: data };
  }

  @MessagePattern('sync_coaster')
  handleSyncCoaster(coaster: any) {
    Logger.log(`Synchronizing coaster data: ${JSON.stringify(coaster)}`);
    // Logic to store coaster data in Redis
    return { ack: true };
  }
}
