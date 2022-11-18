import supertest from 'supertest';
import app from '../../server';
import { JWT } from '../TestConstants';
import client from '../../database';
import {
    generateSQLCreateTestDataQuery,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const mockApp = supertest(app);

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
        const response = await mockApp
            .get(`/api/orders?id=${randomId}`)
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.order).toEqual({
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
