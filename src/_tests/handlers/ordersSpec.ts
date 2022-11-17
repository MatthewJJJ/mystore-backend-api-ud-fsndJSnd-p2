import supertest from 'supertest';
import app from '../../server';
import { JWT } from '../TestConstants';

const mockApp = supertest(app);

describe('testing orders endpoint', () => {
    it('testing returned orders', async () => {
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
