import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import * as bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

import { allMatches, createMatche, teamNotExist, equalTeam, matchesInProgress, matchesNotInProgress } from './mocks/matches_mock';
import { tokenResponse } from './mocks/login_mock';

import { Response } from 'superagent';
import MatchesService from '../services/MatchesService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /matches', () => {
  let chaiHttpResponse: Response;

  describe('Retorno com sucesso ao buscar matches', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(allMatches as any);
      sinon
        .stub(Matches, "create")
        .resolves(createMatche as any);
      sinon.stub(generateToken, "generateToken").resolves(tokenResponse.token);
    });

    afterEach(() => sinon.restore());

    it('Cria uma nova matche como todos os dados corretos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 9,
          homeTeamGoals: 3,
          awayTeamGoals: 1
        })
        .set('authorization', tokenResponse.token);

    expect(chaiHttpResponse.status).to.be.eq(201);
    expect(chaiHttpResponse.body).to.deep.eq(createMatche);
    });
    it('Retorna todas as matches', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches")
        .set('authorization', tokenResponse.token);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq(allMatches);
    });
    it('E possivel finalizar uma partida em andamento', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/10/finish");

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.message).to.be.eq('Finished');
    });
    it('E possivel atualizar os gols dos times, em uma partida em andamento', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/10")
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.message).to.be.eq('Goooooooool');
    });
  });
  describe('Retorna as partidas filtradas por "inProgress"', () => {
    afterEach(() => sinon.restore());

    it('Retorna todas as matches que estao em progresso', async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesInProgress as any);
      
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches?inProgress=true")
        .set('authorization', tokenResponse.token);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq(matchesInProgress);
    });
    it('Retorna todas as matches que nao estao em progresso', async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesNotInProgress as any);
      
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches?inProgress=false")
        .set('authorization', tokenResponse.token);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq(matchesNotInProgress);
    });
  })
  describe('Retorno de erro ao buscar times', () => {
    it('Retorna um erro ao tentar criar uma partida com um time inexistente', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 999,
          awayTeam: 9,
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });

      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.eq(teamNotExist.message);
    });
    it('Retorna um erro ao tentar criar uma partida com os mesmos times', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 9,
          awayTeam: 9,
          homeTeamGoals: 3,
          awayTeamGoals: 1
        })
        .set('authorization', tokenResponse.token);

      expect(chaiHttpResponse.status).to.be.eq(422);
      expect(chaiHttpResponse.body.message).to.be.eq(equalTeam.message);
    });
    it('Retorna um erro ao tentar criar uma partida sem algum valor', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 9,
          homeTeamGoals: 3,
        })
        .set('authorization', tokenResponse.token);

      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
    });
    it('Retorna um erro ao tentar criar uma partida sem um token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 9,
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq('Token not found');
    });
    it('Retorna um erro ao tentar criar uma partida com um token invalido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 9,
          homeTeamGoals: 3,
          awayTeamGoals: 1
        })
        .set('authorization', 'invalidToken');

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq('Token must be a valid token');
    });
  });
});