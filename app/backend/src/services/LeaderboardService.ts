import { ILeaderboard } from '../interfaces/interfaces';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import {
  getTeamInTheMatches,
  getTotalTeamPoints,
  getTotalVictorys,
  getTotalDraws,
  getTotalLosses,
  getGoalsFavor,
  getGoalsOwn,
  getGoalsBalance,
  getEfficiencyTeam,
  sortGradeTeams,
} from '../helpers/LeaderboardFunctions';
import MatchesService from './MatchesService';

export default class LeaderboardService {
  constructor(
    private modelTeam = Teams,
    private matchesService = new MatchesService(),
  ) { }

  public getAllTeamAndMatches = async (): Promise<ILeaderboard[]> => {
    const matches = await this.matchesService.filterByInProgress('false');
    const teams = await this.modelTeam.findAll();
    const gradingTeamsSort = this.getHomeTeams(teams, matches);
    return gradingTeamsSort;
  };

  private getHomeTeams = async (teams: Teams[], matches: Matches[]): Promise<ILeaderboard[]> => {
    const grading: ILeaderboard[] = teams.map((team) => ({
      name: team.teamName,
      totalPoints: getTotalTeamPoints(team, matches),
      totalGames: getTeamInTheMatches(team, matches).length,
      totalVictories: getTotalVictorys(team, matches),
      totalDraws: getTotalDraws(team, matches),
      totalLosses: getTotalLosses(team, matches),
      goalsFavor: getGoalsFavor(team, matches),
      goalsOwn: getGoalsOwn(team, matches),
      goalsBalance: getGoalsBalance(team, matches),
    }));
    const gradingTeams: ILeaderboard[] = grading.map((grade) => ({
      ...grade,
      efficiency: getEfficiencyTeam(grade.totalPoints, grade.totalGames),
    }));

    const gradingTeamsSort = sortGradeTeams(gradingTeams);

    return gradingTeamsSort;
  };
}
