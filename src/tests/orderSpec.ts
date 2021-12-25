// @ts-ignore
import client from '../database';
import { OrderStore, Status } from '../models/order';
import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';
import faker from 'faker';
import { deleteAllTables } from './helpers/afterAll';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const ORDER = {
  status: Status.Active,
  user_id: '1',
};
const USER = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
const PRODUCT = {
  name: faker.commerce.productName(),
  price: +faker.commerce.price(),
  category: faker.commerce.productMaterial(),
};

describe('Order Model', () => {
  beforeAll(async () => {
    await userStore.create(USER);
    await productStore.create(PRODUCT);
  });

  afterAll(async () => {
    // @ts-ignore
    const conn = await client.connect();
    const sql =
      'DELETE FROM order_products;\n ' +
      'ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n' +
      'DELETE FROM orders;\n ' +
      'ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n' +
      'DELETE FROM users;\n ' +
      'ALTER SEQUENCE users_id_seq RESTART WITH 1;\n' +
      'DELETE FROM products;\n ' +
      'ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
    await conn.query(sql);
    conn.release();
  });

  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await orderStore.create(ORDER);
    expect(result.status).toEqual(ORDER.status);
    expect(result.user_id).toEqual(ORDER.user_id);
  });

  it('index method should list all orders', async () => {
    const result = await orderStore.index();
    expect(result.length).toBeDefined();
  });

  it('show method should return order by id', async () => {
    const result = await orderStore.show('1');
    expect(result).toBeDefined();
  });

  it('addProduct method should add product to order_products (cart)', async () => {
    const result = await orderStore.addProduct({
      quantity: 10,
      order_id: '1',
      product_id: '1',
    });
    expect(result).toBeDefined();
  });

  it('getCurrentByUser method should return current (active) order by user id', async () => {
    const result = await orderStore.getCurrentByUser('1');
    expect(result).toBeDefined();
  });

  it('getCompleteByUser method should return all complete orders by user id', async () => {
    // @ts-ignore
    const conn = await client.connect();
    const sql = `UPDATE orders SET status='${Status.Complete}' WHERE id=1;`;
    await conn.query(sql);
    conn.release();
    const result = await orderStore.getCompleteByUser('1');
    expect(result.length).toBeDefined();
  });

  // DELETE all tables
  afterAll(deleteAllTables);
});
