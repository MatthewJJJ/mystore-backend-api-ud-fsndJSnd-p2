insert into products (id, name, price) 
values (1, 'basketball', 25);

insert into users (id, first_name, last_name, password) 
values
(1, 'Tom', 'Brady', '$2b$04$TqXxSYuwR9cebsUWHfsyVOWAFA0MHrICOBKNAssxoMVyXbVI
qpubO'),
(2, 'Peyton', 'Manning', '$2b$04$TqXxSYuwR9cebsUWHfsyVOWAFA0MHrICOBKNAssxoMVyXbVI
qpubO');

insert into orders (id, user_id, order_status) 
values (1, 1, 'active'), (2, 2, 'complete');

insert into products (id, name, price) 
values (2, 'football', 12);

insert into ordered_products (id, quantity, order_id, product_id)
values (1, 5, 1, 1), (2, 8, 1, 2), (3, 3, 2, 1), (4, 12, 2, 2);