import jwt = require('jsonwebtoken');
import { Secret } from 'jsonwebtoken';
import dotenv = require('dotenv');
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const { JWT_SECRET } = process.env;

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, JWT_SECRET as Secret);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
