import client from '../database';

let orderService = async (userId: number): Promise<Object[]> => {
    try {
        const conn = await client.connect();
        const sql = `select orders.id, orders.order_status, users.first_name, users.last_name, ordered_products.quantity, products.name, products.price from orders 
            join users on users.id = orders.user_id 
            join ordered_products on ordered_products.order_id = orders.id 
            join products on products.id = ordered_products.product_id 
            where orders.id = $1;`;
        const results = await conn.query(sql, [userId]);
        conn.release();
        if (results.rows.length === 0) {
            throw new Error('No data found...');
        }
        return results.rows;
    } catch (error) {
        throw new Error(String(error));
    }
};

export default orderService;
