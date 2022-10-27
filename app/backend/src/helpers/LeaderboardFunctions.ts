import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { ILeaderboard } from '../interfaces/interfaces';

export const getTeamInTheMatches = (team: Teams, matches: Matches[]) =>
  matches.filter((matche) => matche.homeTeam === team.id);

export const getDefinedTeamPoints = (point: number): number => {
  let definedTeamPoint = point;
  if (definedTeamPoint < 0) {
    definedTeamPoint = 0;
  }
  return definedTeamPoint;
};

export const getRawTeamPoints = (matches: Matches[]): number =>
  matches.reduce((acc: number, matche) => {
    let totalPointsPerMatche = acc;
    if (matche.homeTeamGoals > matche.awayTeamGoals) {
      totalPointsPerMatche += 3;
    }
    if (matche.homeTeamGoals === matche.awayTeamGoals) {
      totalPointsPerMatche += 1;
    }
    return totalPointsPerMatche;
  }, 0);

export const getTotalTeamPoints = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getTeamInTheMatches(team, matches);
  const rawTeamPoint = getRawTeamPoints(teamInTheMatches);
  const definedTeamPoint = getDefinedTeamPoints(rawTeamPoint);
  return definedTeamPoint;
};

export const getTotalVictorys = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getTeamInTheMatches(team, matches);
  const victorys = teamInTheMatches.filter((matche) => matche.homeTeamGoals > matche.awayTeamGoals);
  return victorys.length;
};

export const getTotalDraws = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getTeamInTheMatches(team, matches);
  const draws = teamInTheMatches.filter((matche) => matche.homeTeamGoals === matche.awayTeamGoals);
  return draws.length;
};

export const getTotalLosses = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getTeamInTheMatches(team, matches);
  const losses = teamInTheMatches.filter((matche) => matche.homeTeamGoals < matche.awayTeamGoals);
  return losses.length;
};

export const getGoalsFavor = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getTeamInTheMatches(team, matches);
  const goalsFavor = teamInTheMatches.reduce((acc, matche) => acc + matche.homeTeamGoals, 0);
  return goalsFavor;
};

export const getGoalsOwn = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getTeamInTheMatches(team, matches);
  const goalsOwn = teamInTheMatches.reduce((acc, matche) => acc + matche.awayTeamGoals, 0);
  return goalsOwn;
};

export const getGoalsBalance = (team: Teams, matches: Matches[]): number => {
  const goalsOwn = getGoalsOwn(team, matches);
  const goalsFavor = getGoalsFavor(team, matches);
  const goalsBalace = goalsFavor - goalsOwn;
  return goalsBalace;
};

export const getEfficiencyTeam = (totalPoints: number, totalGames: number): string => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};

export const sortGradeTeams = (gradingTeams: ILeaderboard[]): ILeaderboard[] =>
  gradingTeams.sort((a, b) => {
    if (b.totalPoints === a.totalPoints) {
      if (b.totalVictories === a.totalVictories) {
        if (b.goalsBalance === a.goalsBalance) {
          if (b.goalsFavor === a.goalsFavor) {
            return b.goalsOwn - a.goalsOwn;
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalVictories - a.totalVictories;
    }
    return b.totalPoints - a.totalPoints;
  });
