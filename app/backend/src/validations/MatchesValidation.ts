import { IMatches } from '../interfaces/interfaces';

const properties = ['homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals'];

export default class MatchesValidation {
  public static validateMatchesInputs(matche: IMatches): boolean {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(matche, properties[i])) {
        return false;
      }
    }
    return true;
  }
}
