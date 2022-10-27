import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getHomeTeams = async (req: Request, res: Response): Promise<Response> => {
    const gradingTeamsSort = await this.leaderboardService.getAllTeamAndMatches();
    return res.status(200).json(gradingTeamsSort);
  };
}
