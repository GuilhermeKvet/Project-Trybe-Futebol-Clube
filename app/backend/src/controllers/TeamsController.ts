import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    const teams = await this.teamsService.findAll();
    return res.status(200).json(teams);
  };

  public findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const teams = await this.teamsService.findById(Number(id));
    return res.status(200).json(teams);
  };
}
