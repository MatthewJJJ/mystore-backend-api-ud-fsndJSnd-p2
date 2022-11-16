import client from "../database";

let orderService = async (userId: number): Promise<Object[]> => {
  try {
    const conn = await client.connect();
    const sql =
      "select orders.id, orders.order_status, orders.quantity, users.first_name, users.last_name, products.name, products.price from orders, users, products where orders.user_id = users.id and orders.product_id = products.id and orders.user_id = $1;";
    const results = await conn.query(sql, [userId]);
    conn.release();
    return results.rows;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};

export default orderService;
