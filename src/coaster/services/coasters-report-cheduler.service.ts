import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoasterRepository } from '../repository/coaster.repository';
import { CoasterReportService } from './coaster-report.service';

@Injectable()
export class ReportScheduler {
  constructor(private localStorage: CoasterRepository) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  logReport() {
    const data = this.localStorage.getRawData();

    for (const value of Object.values(data)) {
      const report = new CoasterReportService(
        value.id,
        value.stuffNumber,
        value.wagons.length,
        value.clientsNumber,
        value.openingHour,
        value.closingHour,
        value.routeLength,
        value.speed,
      ).generateReport();
      Logger.log(report);
    }
  }
}
