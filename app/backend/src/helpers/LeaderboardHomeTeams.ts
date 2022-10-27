import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export const getHomeTeamInTheMatches = (team: Teams, matches: Matches[]) =>
  matches.filter((matche) => matche.homeTeam === team.id);

export const getDefinedHomeTeamPoints = (point: number): number => {
  let definedTeamPoint = point;
  if (definedTeamPoint < 0) {
    definedTeamPoint = 0;
  }
  return definedTeamPoint;
};

export const getRawHomeTeamPoints = (matches: Matches[]): number =>
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

export const getTotalHomeTeamPoints = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getHomeTeamInTheMatches(team, matches);
  const rawTeamPoint = getRawHomeTeamPoints(teamInTheMatches);
  const definedTeamPoint = getDefinedHomeTeamPoints(rawTeamPoint);
  return definedTeamPoint;
};

export const getHomeTotalVictorys = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getHomeTeamInTheMatches(team, matches);
  const victorys = teamInTheMatches.filter((matche) => matche.homeTeamGoals > matche.awayTeamGoals);
  return victorys.length;
};

export const getHomeTotalDraws = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getHomeTeamInTheMatches(team, matches);
  const draws = teamInTheMatches.filter((matche) => matche.homeTeamGoals === matche.awayTeamGoals);
  return draws.length;
};

export const getHomeTotalLosses = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getHomeTeamInTheMatches(team, matches);
  const losses = teamInTheMatches.filter((matche) => matche.homeTeamGoals < matche.awayTeamGoals);
  return losses.length;
};

export const getHomeGoalsFavor = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getHomeTeamInTheMatches(team, matches);
  const goalsFavor = teamInTheMatches.reduce((acc, matche) => acc + matche.homeTeamGoals, 0);
  return goalsFavor;
};

export const getHomeGoalsOwn = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getHomeTeamInTheMatches(team, matches);
  const goalsOwn = teamInTheMatches.reduce((acc, matche) => acc + matche.awayTeamGoals, 0);
  return goalsOwn;
};

export const getHomeGoalsBalance = (team: Teams, matches: Matches[]): number => {
  const goalsOwn = getHomeGoalsOwn(team, matches);
  const goalsFavor = getHomeGoalsFavor(team, matches);
  const goalsBalace = goalsFavor - goalsOwn;
  return goalsBalace;
};

export const getEfficiencyHomeTeam = (totalPoints: number, totalGames: number): string => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};
