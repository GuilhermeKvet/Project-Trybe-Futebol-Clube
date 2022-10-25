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
  email: string,
  role: string;
  iat?: number
}

export interface ITeams {
  id?: number;
  teamsName: string;
}

export interface IMatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}
