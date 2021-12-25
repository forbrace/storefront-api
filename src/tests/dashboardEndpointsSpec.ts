import supertest from 'supertest';
import app from '../server';
import { deleteAllTables } from './helpers/afterAll';
import { OrderStore } from '../models/order';
import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';
import {
  USERS,
  PRODUCTS,
  ORDERS,
  ORDER_PRODUCTS,
} from './helpers/dashboardTestData';
const request = supertest(app);

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Test endpoint response.', () => {
  beforeAll(async () => {
    for (const user of USERS) {
      await userStore.create(user);
    }
    for (const product of PRODUCTS) {
      await productStore.create(product);
    }
    for (const order of ORDERS) {
      await orderStore.create(order);
    }
    for (const orderProducts of ORDER_PRODUCTS) {
      await orderStore.addProduct(orderProducts);
    }
  });

  // Top 5 most popular products
  it('/products/five-most-popular GET endpoint', (done) => {
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

  // Products by category
  it('/products/:category GET endpoint', (done) => {
    request
      .get('/products/' + PRODUCTS[0].category)
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
