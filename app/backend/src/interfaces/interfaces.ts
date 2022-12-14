export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  role: string;
}

export interface IToken {
  id: number;
  email: string;
  role: string;
  iat?: number;
}

export interface ITeams {
  id?: number;
  teamsName: string;
}

export interface IGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatches extends IGoals {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  inProgress: number;
}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency?: string;
}
