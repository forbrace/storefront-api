// @ts-ignore
import client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = <string>process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password_digest?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      //@ts-ignoreX$
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(newUser: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(
        newUser.password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [
        newUser.first_name,
        newUser.last_name,
        newUser.username,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${newUser.username}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`);
    }
  }
}
