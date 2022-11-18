const JWT =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImZpcnN0X25hbWUiOiJDaGVyeSIsImxhc3RfbmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6IiQyYiQwNCRueFZvMXc5amk2cS4zWkxCSXBRcml1VXRRcXpibXNadHZhaVUwSEhPMWxUNGxsZ0pZaGE0ZSIsImlhdCI6MTY2ODcwNDIwMH0.JbOskLfh4YTnQ2RBz0jDrCceO0RdNKpu0zQQyeynjcI';

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
