import supertest from 'supertest';
import app from '../../server';
import { JWT } from '../TestConstants';
import client from '../../database';
import {
    generateSQLCreateTestDataQuery,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const mockApp = supertest(app);

describe('testing the users endpoints ', () => {
    let randomId = Number(Math.floor(Math.random() * 100));

    beforeAll(async () => {
        await client.connect();
        await client.query(generateSQLCreateTestDataQuery(randomId));
    });

    afterAll(async () => {
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('the create successfully create a user', async () => {
        const response = await mockApp
            .post('/api/users')
            .send({
                first_name: 'Chery',
                last_name: 'John',
                password: 'dogandponyshow3000',
            })
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    it('the login route successfully logs in a user', async () => {
        const response = await mockApp
            .post('/api/login')
            .send({
                first_name: 'Chery',
                last_name: 'John',
                password: 'dogandponyshow3000',
            })
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.token).toContain('.');
    });

    it('the index route should return all of the users', async () => {
        const response = await mockApp
            .get('/api/users')
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.users.length).toBe(3);
    });

    it('the show route should currently display the user', async () => {
        const response = await mockApp
            .get(`/api/users/${randomId}`)
            .set('Authorization', JWT);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.user).toEqual({
            first_name: 'Tom',
            last_name: 'Brady',
        });
    });
});
