import client from '../../database';
import { ProductTable } from '../../models/products';
import {
    generateSQLCreateTestDataQuery,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const table = new ProductTable();

describe('testing product model methods', () => {
    let randomId = Number(Math.floor(Math.random() * 100));

    beforeAll(async () => {
        await client.connect();
        await client.query(generateSQLCreateTestDataQuery(randomId));
    });

    afterAll(async () => {
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('the create method should return a response after creating new product', async () => {
        const response = await table.create('Pitching Machine', 2000);
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });

    it('the index method should return all products', async () => {
        const response = await table.index();
        expect(response.length).toBe(2);
    });

    it('the show method should return the correct product', async () => {
        const response = await table.show(randomId);
        expect(response.name).toEqual('basketball');
        expect(response.price).toEqual(25);
    });
});
