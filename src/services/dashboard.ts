// @ts-ignore
import client from '../database';
import { Product } from '../models/product';

export class DashboardQueries {
  // Top 5 most popular products
  async fiveMostPopularProducts(): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'SELECT * FROM products INNER JOIN order_products ON products.id = order_products.id ORDER BY quantity DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get 5 most popular products: ${err}`);
    }
  }

  // Products by category
  async productsByCategory(category: string): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE category=($1)';

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by category: ${err}`);
    }
  }
}
