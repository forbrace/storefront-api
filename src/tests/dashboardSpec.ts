import { DashboardQueries } from '../services/dashboard';
import { OrderStore } from '../models/order';
import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';
import {
  USERS,
  PRODUCTS,
  ORDERS,
  ORDER_PRODUCTS,
} from './helpers/dashboardTestData';
import { deleteAllTables } from './helpers/afterAll';

const dashboardQueries = new DashboardQueries();
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Dashboard Model', () => {
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

  it('should have a fiveMostPopularProducts method', () => {
    expect(dashboardQueries.fiveMostPopularProducts).toBeDefined();
  });

  it('should have a productsByCategory method', () => {
    expect(dashboardQueries.productsByCategory).toBeDefined();
  });

  it('fiveMostPopularProducts method should list 5 popular products', async () => {
    const result = await dashboardQueries.fiveMostPopularProducts();
    expect(result.length).toBeDefined();
  });

  it('productsByCategory method should list all products in corresponding category', async () => {
    const result = await dashboardQueries.productsByCategory(
      PRODUCTS[0].category
    );
    expect(result.length).toBeDefined();
  });

  // DELETE all tables
  afterAll(deleteAllTables);
});
