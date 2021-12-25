import supertest from 'supertest';
import app from '../server';
import { deleteAllTables } from './helpers/afterAll';
const request = supertest(app);

const USER = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'user',
  password: '123123',
};
let token = '';

describe('Test endpoint response.', () => {
  // create
  it('/users POST endpoint', (done) => {
    request
      .post('/users')
      .send(USER)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done.fail(err);
        }
        token = res.body;
        return done();
      });
  });

  // authenticate
  it('/users/authenticate POST endpoint', (done) => {
    request
      .post('/users/authenticate')
      .send({ username: USER.username, password: USER.password })
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // index
  it('/users GET endpoint', (done) => {
    request
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // show
  it('/users/:id GET endpoint', (done) => {
    request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // delete
  it('/users/:id DELETE endpoint', (done) => {
    request
      .delete('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // DELETE all tables
  afterAll(deleteAllTables);
});
