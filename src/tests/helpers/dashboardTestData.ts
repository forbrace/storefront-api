import { Status } from '../../models/order';
import faker from 'faker';

const NUMBER_OF_USERS = 10;
const NUMBER_OF_PRODUCTS_CATEGORIES = 3;
const NUMBER_OF_PRODUCTS = 10;
const NUMBER_OF_ORDERS = 10;
const NUMBER_OF_ORDER_PRODUCTS = 10;

export const USERS = new Array(NUMBER_OF_USERS).fill(null).map(() => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
});

export const PRODUCTS_CATEGORIES = new Array(NUMBER_OF_PRODUCTS_CATEGORIES)
  .fill(null)
  .map(() => {
    return faker.commerce.productMaterial();
  });

export const PRODUCTS = new Array(NUMBER_OF_PRODUCTS).fill(null).map(() => {
  return {
    name: faker.commerce.productName(),
    price: +faker.commerce.price(),
    category:
      PRODUCTS_CATEGORIES[
        Math.floor(Math.random() * PRODUCTS_CATEGORIES.length)
      ],
  };
});

export const STATUSES = [Status.Active, Status.Complete];

export const ORDERS = new Array(NUMBER_OF_ORDERS).fill(null).map(() => {
  return {
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    user_id: '' + (Math.floor(Math.random() * USERS.length) + 1),
  };
});

export const ORDER_PRODUCTS = new Array(NUMBER_OF_ORDER_PRODUCTS)
  .fill(null)
  .map((item, index) => {
    return {
      quantity: Math.floor(Math.random() * 9) + 1,
      order_id: '' + (index + 1),
      product_id: '' + (index + 1),
    };
  });
