import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export const getAwayTeamInTheMatches = (team: Teams, matches: Matches[]) =>
  matches.filter((matche) => matche.awayTeam === team.id);

export const getDefinedAwayTeamPoints = (point: number): number => {
  let definedTeamPoint = point;
  if (definedTeamPoint < 0) {
    definedTeamPoint = 0;
  }
  return definedTeamPoint;
};

export const getRawAwayTeamPoints = (matches: Matches[]): number =>
  matches.reduce((acc: number, matche) => {
    let totalPointsPerMatche = acc;
    if (matche.awayTeamGoals > matche.homeTeamGoals) {
      totalPointsPerMatche += 3;
    }
    if (matche.homeTeamGoals === matche.awayTeamGoals) {
      totalPointsPerMatche += 1;
    }
    return totalPointsPerMatche;
  }, 0);

export const getTotalAwayTeamPoints = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getAwayTeamInTheMatches(team, matches);
  const rawTeamPoint = getRawAwayTeamPoints(teamInTheMatches);
  const definedTeamPoint = getDefinedAwayTeamPoints(rawTeamPoint);
  return definedTeamPoint;
};

export const getAwayTotalVictorys = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getAwayTeamInTheMatches(team, matches);
  const victorys = teamInTheMatches.filter((matche) => matche.awayTeamGoals > matche.homeTeamGoals);
  return victorys.length;
};

export const getAwayTotalDraws = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getAwayTeamInTheMatches(team, matches);
  const draws = teamInTheMatches.filter((matche) => matche.homeTeamGoals === matche.awayTeamGoals);
  return draws.length;
};

export const getAwayTotalLosses = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getAwayTeamInTheMatches(team, matches);
  const losses = teamInTheMatches.filter((matche) => matche.awayTeamGoals < matche.homeTeamGoals);
  return losses.length;
};

export const getAwayGoalsFavor = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getAwayTeamInTheMatches(team, matches);
  const goalsFavor = teamInTheMatches.reduce((acc, matche) => acc + matche.awayTeamGoals, 0);
  return goalsFavor;
};

export const getAwayGoalsOwn = (team: Teams, matches: Matches[]): number => {
  const teamInTheMatches = getAwayTeamInTheMatches(team, matches);
  const goalsOwn = teamInTheMatches.reduce((acc, matche) => acc + matche.homeTeamGoals, 0);
  return goalsOwn;
};

export const getAwayGoalsBalance = (team: Teams, matches: Matches[]): number => {
  const goalsOwn = getAwayGoalsOwn(team, matches);
  const goalsFavor = getAwayGoalsFavor(team, matches);
  const goalsBalace = goalsFavor - goalsOwn;
  return goalsBalace;
};

export const getEfficiencyAwayTeam = (totalPoints: number, totalGames: number): string => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};
