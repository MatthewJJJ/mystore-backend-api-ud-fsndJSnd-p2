import supertest from 'supertest';
import app from '../../server';
import { JWT } from '../TestConstants';
import client from '../../database';
import {
    generateSQLCreateTestDataQuery,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const mockApp = supertest(app);

describe('testing the products endpoints ', () => {
    let randomId = Number(Math.floor(Math.random() * 100));

    beforeAll(async () => {
        await client.connect();
        await client.query(generateSQLCreateTestDataQuery(randomId));
    });

    afterAll(async () => {
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('the create successfully create a product', async () => {
        const response = await mockApp
            .post('/api/products')
            .send({
                name: 'Basketball Returning Machine',
                price: 4000,
            })
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    it('the index route should return all of the products', async () => {
        const response = await mockApp.get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.products.length).toBe(2);
    });

    it('the show route should currently display the product', async () => {
        const response = await mockApp.get(`/api/products/${randomId}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.product).toEqual({
            id: randomId,
            name: 'basketball',
            price: 25,
        });
    });
});
