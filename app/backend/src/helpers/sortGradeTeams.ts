import { ILeaderboard } from '../interfaces/interfaces';

const sortGradeTeams = (gradingTeams: ILeaderboard[]): ILeaderboard[] =>
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

export default sortGradeTeams;
