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
    let data = fs.readFileSync('./logs.log', 'utf-8').split('\n');

    data.map((log: string) => log.substring(0, log.length - 1));

    data.pop();
    
    data = data.map((log: string) => JSON.parse(log));

    return data;
  } catch (err) {
    console.error(err);
  }
}

export { logger, readLogs }