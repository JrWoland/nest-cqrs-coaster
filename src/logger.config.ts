import * as path from 'path';
import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

export const createLoggerConfig = (
  environment: string,
): WinstonModuleOptions => {
  const logsDir = path.resolve(__dirname, `../logs/${environment}`);
  const isProduction = environment === 'production';

  const transports = [
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'warn.log'),
      level: 'warn',
    }),
    new winston.transports.Console({
      level: isProduction ? 'warn' : 'info', // W produkcji tylko `warn` i `error`
      format: winston.format.combine(
        winston.format.colorize(), // Kolory logów w konsoli
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
  ];

  if (environment === 'development') {
    transports.push(
      new winston.transports.File({
        filename: path.join(logsDir, 'info.log'),
        level: 'info',
      }),
    );
  }

  return {
    transports: transports,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      }),
    ),
  };
};
