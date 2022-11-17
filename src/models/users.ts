import client from '../database';
import bcrypt from 'bcrypt';
import { generateJWT } from '../services/authService';

export type User = {
    first_name: string;
    last_name: string;
    hashed_password: string;
};

export class UserTable {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'select first_name, last_name from users;';
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
            const sql = 'select first_name, last_name from users where id=$1;';
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
            const secret = process.env.secret;
            const hashedPassword = bcrypt.hashSync(password + secret, 3);
            const user: User = {
                first_name: first_name,
                last_name: last_name,
                hashed_password: hashedPassword,
            };

            const sql =
                'insert into users(first_name, last_name, password) values($1, $2, $3);';

            const result = await conn.query(sql, [
                first_name,
                last_name,
                hashedPassword,
            ]);

            console.log(result);

            conn.release();
            return generateJWT(user);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    async login(
        first_name: string,
        last_name: string,
        password: string
    ): Promise<String> {
        try {
            const conn = await client.connect();
            const secret = process.env.secret;
            const sql =
                'select * from users where first_name=$1 and last_name=$2;';

            const result = await conn.query(sql, [first_name, last_name]);

            if (
                !bcrypt.compareSync(password + secret, result.rows[0].password)
            ) {
                throw new Error('Password is incorrect...');
            }

            conn.release();
            return generateJWT(result.rows[0]);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }
}
