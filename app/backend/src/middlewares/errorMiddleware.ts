import 'express-async-errors';
import { ErrorRequestHandler, Response } from 'express';
import HttpException from './httpError';

const errorMiddleware: ErrorRequestHandler = (err: HttpException, _req, res: Response, _next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};

export default errorMiddleware;
