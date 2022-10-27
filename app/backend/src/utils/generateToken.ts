import jwt = require('jsonwebtoken');
import { Secret } from 'jsonwebtoken';
import dotenv = require('dotenv');
import { IUser } from '../interfaces/interfaces';

dotenv.config();

const { JWT_SECRET } = process.env;

const generateToken = (user: IUser) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, JWT_SECRET as Secret);
};

export default { generateToken };
