// @ts-ignore
import client from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};

export type OrderProducts = {
  id?: string;
  quantity: number;
  order_id: string;
  product_id: string;
};

export enum Status {
  Active = 'active',
  Complete = 'complete',
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [order.status, order.user_id]);

      const newOrder = result.rows[0];

      conn.release();

      return newOrder;
    } catch (err) {
      throw new Error(`Could not add new order ${order.id}. Error: ${err}`);
    }
  }

  async addProduct(orderProducts: OrderProducts): Promise<OrderProducts> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        orderProducts.quantity,
        orderProducts.order_id,
        orderProducts.product_id,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${orderProducts.product_id} to order ${orderProducts.order_id}: ${err}`
      );
    }
  }

  async getCurrentByUser(user_id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id, Status.Active]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  async getCompleteByUser(user_id: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id, Status.Complete]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }
}
