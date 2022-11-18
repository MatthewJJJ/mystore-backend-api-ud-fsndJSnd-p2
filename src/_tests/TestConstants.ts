const JWT =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiQ2hlcnkiLCJsYXN0X25hbWUiOiJKb2huIiwiaGFzaGVkX3Bhc3N3b3JkIjoiJDJiJDA0JHZqbUc2V0IvR1hZRGprbldYQ0ZUTC5MSnJrSy9SZnVyQk9aNGpUMmVKQzFLaFh5NENSL1JhIiwiaWF0IjoxNjY4Nzk4MzI1fQ.Ytr1Vc6E5M_pYmXdxZaaY95wW1LFw8WFN09nRUuRZpw';

const generateSQLCreateTestDataQuery = (id: number) => {
    return `
insert into products (id, name, price) values
(${id}, 'basketball', 25);

insert into users (id, first_name, last_name, password) values
(${id}, 'Tom', 'Brady', '$2b$04$TqXxSYuwR9cebsUWHfsyVOWAFA0MHrICOBKNAssxoMVyXbVI
qpubO');

insert into orders (id, product_id, quantity, user_id, order_status) values
(${id}, ${id}, 20, ${id}, 'active');
`;
};

const SQL_DELETE_TEST_DATA_QUERY = `
delete from orders where id is not null;
delete from users where id is not null;
delete from products where id is not null;
`;

export { JWT, generateSQLCreateTestDataQuery, SQL_DELETE_TEST_DATA_QUERY };
