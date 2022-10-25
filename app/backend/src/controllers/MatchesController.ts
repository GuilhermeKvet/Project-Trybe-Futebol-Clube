import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress: query } = req.query;

    if (!query) {
      const matches = await this.matchesService.findAll();
      return res.status(200).json(matches);
    }

    const filteredMatches = await this.matchesService.filterByInProgress(query as string);
    return res.status(200).json(filteredMatches);
  };
}
