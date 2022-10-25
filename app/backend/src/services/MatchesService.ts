import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

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
}
