import 'express-async-errors';
import { ErrorRequestHandler, Response } from 'express';
import HttpException from '../helpers/httpError';

const errorMiddleware: ErrorRequestHandler = (err: HttpException, _req, res: Response, _next) => {
  res.status(err.statusCode).json({ message: err.message });
};

export default errorMiddleware;
