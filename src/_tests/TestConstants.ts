const JWT =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiQ2hlcnkiLCJsYXN0X25hbWUiOiJKb2huIiwiaGFzaGVkX3Bhc3N3b3JkIjoiJDJiJDA0JGJSVjFDTzFXWnJJY1p4SFFma0lld09jZmVCbmt4MTIyTS9lM0J0ZmNrcnNvV3lVREl4djUyIiwiaWF0IjoxNjY5MTU5NTg4fQ.mPPr6VUpNxu764Qe0VSDAoDdbqC1jBkHFCCyvD_2rmk';

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
