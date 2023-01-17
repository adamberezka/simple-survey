import { promisify } from "util";
import { format } from "winston";

require('winston-daily-rotate-file');
const winston = require('winston');


const defaultTransport = new winston.transports.DailyRotateFile({
  filename: 'default-logs.%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  auditFile: "winston-default-audit.audit.json",
  dirname: "./default-logs",
});

const loginTransport = new winston.transports.DailyRotateFile({
  filename: 'logins.%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  auditFile: "winston-login-audit.audit.json",
  dirname: "./login-logs",
});

// transport.on('rotate', function(oldFilename, newFilename) {
//   // something that happens on daily rotate
// });

/**
 * Writes all logs to combined.log
 */
const defaultLogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    defaultTransport,
  ],
});

const loginLogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    loginTransport,
  ],
});

const readLogs = async (from: Date, to: Date, logsPath: string) => {
  const { promises: fs } = require('fs');

  console.log("from, to, path: ", from, to, logsPath);

  try {
    const fromTs = new Date(from).getTime();
    const toTs = new Date(to).getTime();
    
    let logFiles: string[] = await fs.readdir(logsPath);

    logFiles = logFiles.filter((file: string) => {
      const fileTs = new Date(file.split(".")[1]).getTime();
      
      return fileTs >= fromTs && fileTs <= toTs;
    });
    
    console.log("logFiles: ", logFiles);
    
    let data: string[] = [];
    
    for (const log of logFiles) {
      let logData = await fs.readFile(`${logsPath}/${log}`, 'utf-8');
      
      console.log("log data from fs.readFile: ", logData);

      logData = logData.split("\n");
      logData = logData.map((log: string) => log.substring(0, log.length - 1));
      // logData.pop();

      console.log("logData: ", logData);
      
      logData = logData.map((log: string) => {console.log("log: ", log); return JSON.parse(log)});
      
      data.push(...logData);
    }

    console.log("end data: ", data);

    return data;
  } catch (err) {
    console.error(err);
  }
}

export { loginLogger, defaultLogger, readLogs }