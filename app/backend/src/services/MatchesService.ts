import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/interfaces';
import MatchesValidation from '../validations/MatchesValidation';
import HttpException from '../middlewares/httpError';

export default class MatchesService {
  constructor(private model = Matches) { }

  public findAll = async (): Promise<Matches[]> => {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public filterByInProgress = async (query: string): Promise<Matches[]> => {
    const matches = await this.model.findAll({
      where: { inProgress: query === 'true' },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public create = async (matche: IMatches): Promise<Matches> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matche;
    const inProgress = true;
    if (!MatchesValidation.validateMatchesInputs) {
      throw new HttpException(400, 'All fields must be filled');
    }
    const insertMatche = await this.model.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );
    return insertMatche;
  };

  public finished = async (id: number): Promise<void> => {
    const inProgress = false;
    await this.model.update({ inProgress }, { where: { id } });
  };
}
