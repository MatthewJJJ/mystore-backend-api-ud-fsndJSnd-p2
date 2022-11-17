import client from '../../database';
import orderService from '../../services/orderService';
import {
    SQL_CREATE_TEST_DATA_QUERY,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

describe('testing orders endpoint', () => {
    beforeAll(async () => {
        await client.connect();
        await client.query(SQL_CREATE_TEST_DATA_QUERY);
    });

    afterAll(async () => {
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('should return an order when passed a correct id', async () => {
        const response = await orderService(3);
        expect(response as unknown).toEqual({
            id: 3,
            order_status: 'complete',
            quantity: 20,
            first_name: 'Peyton',
            last_name: 'Manning',
            name: 'baseball bat',
            price: 10,
        });
    });
});
