import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/TeamsModel';

const hasTeamMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teams = await Teams.findAll();

  const hasHomeTeam = teams.some((team) => team.id === homeTeam);
  const hasAwayTeam = teams.some((team) => team.id === awayTeam);

  if (hasHomeTeam && hasAwayTeam) return next();
  return res.status(404).json({ message: 'There is no team with such id!' });
};

export default hasTeamMiddleware;
