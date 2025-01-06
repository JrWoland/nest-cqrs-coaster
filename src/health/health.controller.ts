import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { RedisHealthIndicator } from 'src/health/redis.health-indicator';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private redisIndicator: RedisHealthIndicator,
  ) {}

  @Get('/redis')
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      async () => this.redisIndicator.isHealthy('redis'),
    ]);
  }
}
