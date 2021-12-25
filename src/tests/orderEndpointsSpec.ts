import { Status } from '../models/order';
import supertest from 'supertest';
import app from '../server';
import faker from 'faker';
import { deleteAllTables } from './helpers/afterAll';
const request = supertest(app);

const USER = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
const ORDER = {
  status: Status.Active,
  user_id: '1',
};
let token = '';

describe('Test endpoint response.', () => {
  beforeAll((done) => {
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

  // create
  it('/orders POST endpoint', (done) => {
    request
      .post('/orders')
      .send(ORDER)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // index
  it('/orders GET endpoint', (done) => {
    request
      .get('/orders')
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // show
  it('/orders/:id GET endpoint', (done) => {
    request
      .get('/orders/1')
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // Current Order by user
  it('/orders/user/:id/active GET endpoint', (done) => {
    request
      .get('/orders/user/1/active')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // Completed Orders by user
  it('/orders/user/:id/complete GET endpoint', (done) => {
    request
      .get('/orders/user/1/complete')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // Add product
  it('/orders/:id/products POST endpoint', (done) => {
    request
      .post('/orders/1/products')
      .send({
        quantity: 10,
        order_id: '1',
        product_id: '1',
      })
      .set('Accept', 'application/json')
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
