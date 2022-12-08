import { NextFunction, Request, Response } from "express";
import { logger, readLogs } from "../utils/loggerUtils";

const logRequests = async (req: Request, _res: Response, next: NextFunction) => {
  logger.log('info', `${req.method} request from ${req.ip} to ${req.headers.host} (host) at URL: ${req.originalUrl}`);

  next();
}

export default logRequests;