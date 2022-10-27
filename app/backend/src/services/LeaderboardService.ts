import { ILeaderboard } from '../interfaces/interfaces';
import Teams from '../database/models/TeamsModel';
import {
  getHomeTeamInTheMatches,
  getTotalHomeTeamPoints,
  getHomeTotalVictorys,
  getHomeTotalDraws,
  getHomeTotalLosses,
  getHomeGoalsFavor,
  getHomeGoalsOwn,
  getHomeGoalsBalance,
  getEfficiencyHomeTeam,
} from '../helpers/LeaderboardHomeTeams';
import {
  getAwayTeamInTheMatches,
  getTotalAwayTeamPoints,
  getAwayTotalVictorys,
  getAwayTotalDraws,
  getAwayTotalLosses,
  getAwayGoalsFavor,
  getAwayGoalsOwn,
  getAwayGoalsBalance,
  getEfficiencyAwayTeam,
} from '../helpers/LeaderboardAwayTeams';
import MatchesService from './MatchesService';
import sortGradeTeams from '../helpers/sortGradeTeams';
import {
  getEfficiencyTeam,
  getGoalsBalance,
  getGoalsFavor,
  getGoalsOwn,
  getTeamInTheMatches,
  getTotalDraws,
  getTotalLosses,
  getTotalTeamPoints, getTotalVictorys,
} from '../helpers/LeaderboardTeams';

export default class LeaderboardService {
  constructor(
    private modelTeam = Teams,
    private matchesService = new MatchesService(),
  ) { }

  private getAllTeamAndMatches = async () => {
    const matches = await this.matchesService.filterByInProgress('false');
    const teams = await this.modelTeam.findAll();
    return { teams, matches };
  };

  public getHomeTeamsGrade = async (): Promise<ILeaderboard[]> => {
    const { teams, matches } = await this.getAllTeamAndMatches();
    const grading: ILeaderboard[] = teams.map((team) => ({
      name: team.teamName,
      totalPoints: getTotalHomeTeamPoints(team, matches),
      totalGames: getHomeTeamInTheMatches(team, matches).length,
      totalVictories: getHomeTotalVictorys(team, matches),
      totalDraws: getHomeTotalDraws(team, matches),
      totalLosses: getHomeTotalLosses(team, matches),
      goalsFavor: getHomeGoalsFavor(team, matches),
      goalsOwn: getHomeGoalsOwn(team, matches),
      goalsBalance: getHomeGoalsBalance(team, matches),
    }));
    const gradingTeams: ILeaderboard[] = grading.map((grade) => ({
      ...grade,
      efficiency: getEfficiencyHomeTeam(grade.totalPoints, grade.totalGames),
    }));

    const gradingTeamsSort = sortGradeTeams(gradingTeams);

    return gradingTeamsSort;
  };

  public getAwayTeamsGrade = async (): Promise<ILeaderboard[]> => {
    const { teams, matches } = await this.getAllTeamAndMatches();
    const grading: ILeaderboard[] = teams.map((team) => ({
      name: team.teamName,
      totalPoints: getTotalAwayTeamPoints(team, matches),
      totalGames: getAwayTeamInTheMatches(team, matches).length,
      totalVictories: getAwayTotalVictorys(team, matches),
      totalDraws: getAwayTotalDraws(team, matches),
      totalLosses: getAwayTotalLosses(team, matches),
      goalsFavor: getAwayGoalsFavor(team, matches),
      goalsOwn: getAwayGoalsOwn(team, matches),
      goalsBalance: getAwayGoalsBalance(team, matches),
    }));
    const gradingTeams: ILeaderboard[] = grading.map((grade) => ({
      ...grade,
      efficiency: getEfficiencyAwayTeam(grade.totalPoints, grade.totalGames),
    }));

    const gradingTeamsSort = sortGradeTeams(gradingTeams);

    return gradingTeamsSort;
  };

  public getAllTeamsGrade = async (): Promise<ILeaderboard[]> => {
    const { teams, matches } = await this.getAllTeamAndMatches();
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
