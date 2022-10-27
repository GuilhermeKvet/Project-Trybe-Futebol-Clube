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

describe('', () => {});