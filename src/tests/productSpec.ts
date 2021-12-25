import { ProductStore } from '../models/product';
import faker from 'faker';
import { deleteAllTables } from './helpers/afterAll';

const store = new ProductStore();
const PRODUCT = {
  name: faker.commerce.productName(),
  price: +faker.commerce.price(),
  category: faker.commerce.productMaterial(),
};

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create(PRODUCT);
    expect(result.name).toEqual(PRODUCT.name);
    expect(result.price).toEqual(PRODUCT.price);
  });

  it('index method should list all products', async () => {
    const result = await store.index();
    expect(result.length).toBeDefined();
  });

  it('show method should return product by id', async () => {
    const result = await store.show('1');
    expect(result).toBeDefined();
  });

  // DELETE all tables
  afterAll(deleteAllTables);
});
