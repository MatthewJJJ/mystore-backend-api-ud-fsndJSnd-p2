const JWT =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiQ2hlcnkiLCJsYXN0X25hbWUiOiJKb2huIiwiaGFzaGVkX3Bhc3N3b3JkIjoiJDJiJDA0JHZqbUc2V0IvR1hZRGprbldYQ0ZUTC5MSnJrSy9SZnVyQk9aNGpUMmVKQzFLaFh5NENSL1JhIiwiaWF0IjoxNjY4Nzk4MzI1fQ.Ytr1Vc6E5M_pYmXdxZaaY95wW1LFw8WFN09nRUuRZpw';

const generateSQLCreateTestDataQuery = (id: number) => {
    return `
    insert into products (id, name, price) 
    values (${id}, 'basketball', 25);
    
    insert into users (id, first_name, last_name, password) 
    values
    (${id}, 'Tom', 'Brady', '$2b$04$TqXxSYuwR9cebsUWHfsyVOWAFA0MHrICOBKNAssxoMVyXbVI
    qpubO'),
    (${
        id + 1
    }, 'Peyton', 'Manning', '$2b$04$TqXxSYuwR9cebsUWHfsyVOWAFA0MHrICOBKNAssxoMVyXbVI
    qpubO');
    
    insert into orders (id, user_id, order_status) 
    values (${id}, ${id}, 'active'), (${id + 1}, ${id + 1}, 'complete');
    
    insert into products (id, name, price) 
    values (${id + 1}, 'football', 12);
    
    insert into ordered_products (id, quantity, order_id, product_id)
    values 
    (${id}, 5, ${id}, ${id}), 
    (${id + 1}, 8, ${id}, ${id + 1}), 
    (${id + 2}, 3, ${id + 1}, ${id}), 
    (${id + 3}, 12, ${id + 1}, ${id + 1});
`;
};

const SQL_DELETE_TEST_DATA_QUERY = `
delete from ordered_products where id > 0;
delete from orders where id > 0;
delete from users where id > 0;
delete from products where id > 0;
`;

export { JWT, generateSQLCreateTestDataQuery, SQL_DELETE_TEST_DATA_QUERY };
