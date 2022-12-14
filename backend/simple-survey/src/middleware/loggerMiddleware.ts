import { NextFunction, Request, Response } from "express";
import { defaultLogger } from "../utils/loggerUtils";

const logRequests = async (req: Request, _res: Response, next: NextFunction) => {
  defaultLogger.log('info', `${req.method} request from ${req.ip} to ${req.headers.host} (host) at URL: ${req.originalUrl}`);

  next();
}

export default logRequests;