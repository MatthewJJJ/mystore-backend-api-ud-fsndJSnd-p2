import supertest from 'supertest';
import app from '../../server';
import { JWT } from '../TestConstants';
import client from '../../database';
import {
    SQL_CREATE_TEST_DATA_QUERY,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const mockApp = supertest(app);

describe('testing orders endpoint', () => {
    beforeAll(async () => {
        await client.connect();
        await client.query(SQL_CREATE_TEST_DATA_QUERY);
    });

    afterAll(async () => {
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('should return an order when passed a correct id', async () => {
        const response = await mockApp
            .get('/api/orders?id=3')
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.order).toEqual({
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
