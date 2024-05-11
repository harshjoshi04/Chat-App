import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

const asyncErrorHandler = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error) => {
      let statusCode = 400;
      let message = error instanceof Error ? error.message : "Server Error";
      next(createError(statusCode, message));
    });
  };
};

export default asyncErrorHandler;
