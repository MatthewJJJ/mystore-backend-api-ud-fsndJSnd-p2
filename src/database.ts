import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { HOST, DATABASE, USER, PASSWORD, TEST_DATABASE, ENV } = process.env;

console.log({
  host: HOST,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
});

let client = new Pool({
  host: HOST,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
});

// if (ENV === "test") {
//   client = new Pool({
//     host: HOST,
//     database: TEST_DATABASE,
//     user: USER,
//     password: PASSWORD,
//   });
// }

export default client;
