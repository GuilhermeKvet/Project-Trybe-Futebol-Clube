import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  public getHomeTeams = async (req: Request, res: Response): Promise<Response> => {
    const gradingTeamsSort = await this.leaderboardService.getHomeTeamsGrade();
    return res.status(200).json(gradingTeamsSort);
  };

  public getAwayTeams = async (req: Request, res: Response): Promise<Response> => {
    const gradingTeamsSort = await this.leaderboardService.getAwayTeamsGrade();
    return res.status(200).json(gradingTeamsSort);
  };

  public getAllTeams = async (req: Request, res: Response): Promise<Response> => {
    const gradingTeamsSort = await this.leaderboardService.getAllTeamsGrade();
    return res.status(200).json(gradingTeamsSort);
  };
}
