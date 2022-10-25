import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.loginService.login(req.body);
    return res.status(200).json({ token });
  };

  public validate = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const role = await this.loginService.validate(authorization as string);
    return res.status(200).json({ role });
  };
}
