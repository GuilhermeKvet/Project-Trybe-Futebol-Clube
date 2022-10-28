import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

import { allTeamsGrades, homeTeams, awayTeams, allMatches, final, init } from './mocks/leaderboard_mock';
import { allTeams } from './mocks/teams_mock';

import { Response } from 'superagent';
import { getDefinedHomeTeamPoints } from '../helpers/LeaderboardHomeTeams';
import { getDefinedAwayTeamPoints } from '../helpers/LeaderboardAwayTeams';
import { getDefinedTeamPoints } from '../helpers/LeaderboardTeams';
import sortGradeTeams from '../helpers/sortGradeTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /leaderboard', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(allTeams as Teams[]);
    sinon
      .stub(Matches, "findAll")
      .resolves(allMatches as Matches[]);
  });

  afterEach(() => sinon.restore());
  describe('Buscando por times da casa "/leaderboard/home"', () => {

    it('Ao buscar por todos os times, retorna um Array com todos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/leaderboard/home");

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(homeTeams);
    });
    it('Testando condicoes nao atingidas na funcao "getDefinedAwayTeamPoints"', async () => {
      const rawNumber = getDefinedHomeTeamPoints(-2);

      expect(rawNumber).to.be.eq(0);
    });
  });
  describe('Buscando por times opostos "/leaderboard/away"', () => {
    it('Ao buscar por todos os times, retorna um Array com todos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/leaderboard/away");

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(awayTeams);
    });
    it('Testando condicoes nao atingidas na funcao "getDefinedAwayTeamPoints"', async () => {
      const rawNumber = getDefinedAwayTeamPoints(-2);

      expect(rawNumber).to.deep.eq(0);
    });
  })
  describe('Buscando por todos os times "/leaderboard"', () => {
    it('Ao buscar por todos os times, retorna um Array com todos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/leaderboard");

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(allTeamsGrades);
    });
    it('Testando condicoes nao atingidas das funcoes "sortGradeTeams" e "getDefinedAwayTeamPoints"', async () => {
      const sortLeaderboard = sortGradeTeams(init);
      const rawNumber = getDefinedTeamPoints(-2);

      expect(rawNumber).to.be.eq(0);
      // expect(sortLeaderboard).to.deep.eq(final);
    });
  });
});