import Teams from '../database/models/TeamsModel';
import HttpException from '../helpers/httpError';

export default class TeamsService {
  constructor(private model = Teams) { }

  public findAll = async (): Promise<Teams[]> => {
    const teams = await this.model.findAll();
    return teams;
  };

  public findById = async (id: number): Promise<Teams> => {
    const team = await this.model.findByPk(id);
    if (!team) throw new HttpException(404, 'Not Found');
    return team;
  };
}
