import supertest from 'supertest';
import app from '../server';
import faker from 'faker';
import { deleteAllTables } from './helpers/afterAll';
const request = supertest(app);

const PRODUCT = {
  name: faker.commerce.productName(),
  price: +faker.commerce.price(),
  category: faker.commerce.productMaterial(),
};
const USER = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
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
  it('/products POST endpoint', (done) => {
    request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(PRODUCT)
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

  // index
  it('/products GET endpoint', (done) => {
    request
      .get('/products')
      .expect(200)
      .end(function (err, _res) {
        if (err) {
          return done.fail(err);
        }
        return done();
      });
  });

  // show
  it('/products/:id GET endpoint', (done) => {
    request
      .get('/products/1')
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
