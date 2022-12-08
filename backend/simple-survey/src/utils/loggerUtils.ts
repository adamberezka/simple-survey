import { format } from "winston";

const winston = require('winston');

const MAIN_LOGS = 'logs.log';

/**
 * Writes all logs to combined.log
 */
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: MAIN_LOGS }),
  ],
});

const readLogs = () => {
  const fs = require('fs');

  try {
    const data = fs.readFileSync('./logs.log', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

export { logger, readLogs }