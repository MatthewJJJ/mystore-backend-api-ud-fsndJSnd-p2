import client from '../../database';
import { UserTable } from '../../models/users';
import { SQL_DELETE_TEST_DATA_QUERY } from '../TestConstants';

const table = new UserTable();

describe('testing user model methods', () => {
    afterAll(async () => {
        await client.connect();
        await client.query(SQL_DELETE_TEST_DATA_QUERY);
    });

    it('the create method should return a response after creating new user', async () => {
        const responseUser1 = await table.create(
            'Chery1',
            'John1',
            'dogandponyshow30001'
        );
        expect(typeof responseUser1).toBe('string');
        expect(responseUser1.length).toBeGreaterThan(0);
        const responseUser2 = await table.create(
            'Chery2',
            'John2',
            'dogandponyshow30002'
        );
        expect(typeof responseUser2).toBe('string');
        expect(responseUser2.length).toBeGreaterThan(0);
    });

    it('the index method should return all users', async () => {
        const response = await table.index();
        expect(response.length).toBe(2);
    });

    it('the show method should return the correct user', async () => {
        await client.connect();
        let insertedData = await client.query(
            'select * from users where first_name=$1;',
            ['Chery1']
        );
        const response = await table.show(insertedData.rows[0].id);
        expect(response.first_name).toEqual('Chery1');
        expect(response.last_name).toEqual('John1');
    });
});
