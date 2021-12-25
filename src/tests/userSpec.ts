import { User, UserStore } from '../models/user';
// @ts-ignore
import bcrypt from 'bcrypt';
import faker from 'faker';

const pepper = process.env.BCRYPT_PASSWORD;

const store = new UserStore();
const USER = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create(USER);
    expect(result.first_name).toEqual(USER.first_name);
    expect(result.last_name).toEqual(USER.last_name);
  });

  it('index method should return a list of users', async () => {
    const result: User[] = await store.index();
    expect(result.length).toBeDefined();
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('1');
    expect(result).toBeDefined();
  });

  it('authenticate method should return user', async () => {
    const result = await store.authenticate(USER.username, USER.password);
    expect(
      bcrypt.compareSync(
        USER.password + pepper,
        result?.password_digest as string
      )
    ).toBeTrue();
  });

  it('delete method should return undefined', async () => {
    const result = await store.delete('1');
    expect(result).toBeUndefined();
  });
});
