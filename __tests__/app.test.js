require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'drmeloy',
        email: 'drmeloy@gmail.com',
        password: 'hype'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'drmeloy',
          email: 'drmeloy@gmail.com',
          __v: 0
        });
      });
  });
});
