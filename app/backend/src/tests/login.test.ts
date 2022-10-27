import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import * as bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken';

import { userResponse, tokenResponse, invalidField, invalidUser, validateUser } from './mocks/login_mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /login', () => {
  let chaiHttpResponse: Response;

  describe('Retorno de sucesso ao logar', () => {
    beforeEach(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...userResponse
      } as Users);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(generateToken, "generateToken").resolves(tokenResponse.token);
    });
  
    afterEach(() => sinon.restore());

    it('Verifica se ao logar com um usuario existente, gera um token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "admin@admin.com",
          password: "secret_admin"
        });


      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.token).to.be.eq(tokenResponse.token);
    });
  });
  describe('Retorno de erro ao tentar logar', () => {
    beforeEach(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);
    });
  
    afterEach(() => sinon.restore());

    it('Verifica se ao logar com um usuario inexistente, gera um erro', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "falseUser@admin.com",
          password: "falsePassword"
        });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq(invalidUser.message);
    });
    it('Verifica se ao logar com um campo nao preenchido, gera um erro', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "admin@admin.com",
          password: ""
        });

      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.be.eq(invalidField.message);
    });
    it('Verifica se ao logar com uma senha invalida, gera um erro', async () => {
      sinon.stub(bcrypt, 'compare').resolves(false);
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({
          email: "admin@admin.com",
          password: "senhaInvalida"
        });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq(invalidUser.message);
    });
  });
  describe('Testando rota /login/validate', () => {
    it('Verifica se e retornado o "role", contendo um token valido', async () => {
      await chai
        .request(app)
        .post("/login")
        .send({
          email: "admin@admin.com",
          password: "secret_admin"
        });
        
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set('authorization', tokenResponse.token);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.role).to.be.eq('admin');
    });

    it('Verifica se e retornado um erro, contendo um token invalido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set('authorization', 'invalid token');

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq('Token must be a valid token');
    });
  });
});