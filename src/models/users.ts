import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  first_name: string;
  last_name: string;
  hashed_password: string;
};

export class UserTable {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "select first_name, last_name from users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "select first_name, last_name from users where id=$1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  async create(
    first_name: string,
    last_name: string,
    password: string
  ): Promise<String> {
    try {
      const conn = await client.connect();
      let secret = process.env.secret;
      console.log(secret);
      let hashedPassword = bcrypt.hashSync(password + secret, 3);
      console.log(hashedPassword.length);
      const sql =
        "insert into users(first_name, last_name, password) values($1, $2, $3);";
      const result = await conn.query(sql, [
        first_name,
        last_name,
        hashedPassword,
      ]);
      conn.release();
      return JSON.stringify(result);
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }
}
