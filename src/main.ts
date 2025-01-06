import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RedisMicroserviceModule } from './redis-microservice/redis-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);

  const redisHost = configService.get<string>('REDIS_HOST', 'localhost');
  const redisPort = configService.get<number>('REDIS_PORT', 6479);

  const redisMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      RedisMicroserviceModule,
      {
        transport: Transport.REDIS,
        options: {
          host: redisHost,
          port: redisPort,
        },
      },
    );

  try {
    redisMicroservice.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    await redisMicroservice.listen();
    console.log(`Redis microservice is running on ${redisHost}:${redisPort}`);
  } catch (error) {
    console.error('Failed to start Redis microservice:', error);
  }

  // Start main application
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
