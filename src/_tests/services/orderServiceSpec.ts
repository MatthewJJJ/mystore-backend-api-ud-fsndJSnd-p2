import client from '../../database';
import orderService from '../../services/orderService';
import {
    generateSQLCreateTestDataQuery,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

describe('testing orders endpoint', () => {
    let randomId = Number(Math.floor(Math.random() * 100));

    beforeAll(async () => {
        await client.connect();
        await client.query(generateSQLCreateTestDataQuery(randomId));
    });

    afterAll(async () => {
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('should return an order when passed a correct id', async () => {
        const response = await orderService(randomId);
        expect(response as unknown).toEqual({
            id: randomId,
            order_status: 'active',
            quantity: 20,
            first_name: 'Tom',
            last_name: 'Brady',
            name: 'basketball',
            price: 25,
        });
    });
});
