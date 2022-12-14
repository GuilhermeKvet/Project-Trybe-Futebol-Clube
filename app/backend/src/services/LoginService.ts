import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
import { Secret } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import LoginValidation from '../validations/LoginValidation';
import { ILogin, IToken } from '../interfaces/interfaces';
import generateTokenFunction from '../utils/generateToken';
import HttpException from '../helpers/httpError';
import Users from '../database/models/UsersModel';

dotenv.config();

const { JWT_SECRET } = process.env;

export default class LoginService {
  constructor(private model = Users) {}

  public login = async (user: ILogin): Promise<string> => {
    const { email, password } = user;

    if (!LoginValidation.validateLogin(email, password)) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const hasUser = await this.model.findOne({ where: { email } });

    if (!hasUser) throw new HttpException(401, 'Incorrect email or password');

    const isValidPassword = await compare(password, hasUser.password);

    if (!isValidPassword) throw new HttpException(401, 'Incorrect email or password');

    const token = generateTokenFunction.generateToken(hasUser);
    return token;
  };

  public validate = async (autorization: string): Promise<string> => {
    const { role } = jwt.verify(autorization, JWT_SECRET as Secret) as IToken;
    return role;
  };
}
