import { NextFunction, Request, Response } from "express";

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).json({ error: { status, message } });
};
