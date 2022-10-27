import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { allTeams, oneTeam } from './mocks/teams_mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /teams', () => {
  let chaiHttpResponse: Response;

  describe('Retorno com sucesso ao buscar times', () => {
    beforeEach(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(allTeams as Teams[]);
      sinon
        .stub(Teams, "findByPk")
        .resolves(oneTeam as Teams);
    });

    afterEach(() => sinon.restore());

    it('Ao buscar por todos os times, retorna um Array com todos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams");

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(allTeams);
    });
    it('Retorna o time correto ao ser buscado atraves do id', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams/1");

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq(oneTeam);
    });
  });
  describe('Retorno de erro ao buscar times', () => {
    it('Retorna um erro ao solicitar por um time que nao existe', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams/999");

      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.eq('Not Found');
    });
  });
});