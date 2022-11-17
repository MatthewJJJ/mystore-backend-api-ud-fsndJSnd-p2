import supertest from 'supertest';
import app from '../../server';
import { JWT } from '../TestConstants';
import client from '../../database';
import {
    SQL_CREATE_TEST_DATA_QUERY,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const mockApp = supertest(app);

describe('testing the products endpoints ', () => {
    beforeAll(async () => {
        await client.connect();
        await client.query(SQL_CREATE_TEST_DATA_QUERY);
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
        expect(response.body.products.length).toBe(6);
    });

    it('the show route should currently display the product', async () => {
        const response = await mockApp.get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.product).toEqual({
            id: 1,
            name: 'basketball',
            price: 25,
        });
    });
});
