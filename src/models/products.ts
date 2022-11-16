import client from "../database";

export type Product = {
  name: string;
  price: number;
};

export class ProductTable {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "select * from products;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "select * from products where id=$1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  async create(name: string, price: number): Promise<String> {
    try {
      const conn = await client.connect();
      const sql = "insert into products(name, price) values($1, $2);";
      const result = await conn.query(sql, [name, price]);
      conn.release();
      return JSON.stringify(result);
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }
}
