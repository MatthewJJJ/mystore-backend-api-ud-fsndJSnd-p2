import client from '../../database';
import { ProductTable } from '../../models/products';
import {
    SQL_CREATE_TEST_DATA_QUERY,
    SQL_DELETE_TEST_DATA_QUERY,
} from '../TestConstants';

const table = new ProductTable();

describe('testing product model methods', () => {
    beforeAll(async () => {
        await client.connect();
        await client.query(SQL_CREATE_TEST_DATA_QUERY);
    });

    afterAll(async () => {
        await client.connect();
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('the index method should return all products', async () => {
        const response = await table.index();
        expect(response.length).toBe(5);
    });

    it('the show method should return the correct product', async () => {
        const response = await table.show(1);
        expect(response.name).toEqual('basketball');
        expect(response.price).toEqual(25);
    });

    it('the create method should return a response after creating new product', async () => {
        const response = await table.create('Pitching Machine', 2000);
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });
});
