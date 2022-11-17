insert into products (id, name, price) values
(1, 'basketball', 25), 
(2, 'baseball bat', 10), 
(3, 'basketball hoop', 100), 
(4, 'baseball', 2),
(5, 'football', 8);

insert into users (id, first_name, last_name, password) values
(1, 'Tom', 'Brady', '$2b$04$TqXxSYuwR9cebsUWHfsyVOWAFA0MHrICOBKNAssxoMVyXbVI
qpubO'),
(2, 'Drew', 'Brees', '$2b$04$L4l1crCuOYeFDay8eE8sQ.Wjiq31qrMLzHLUKBvuLXT7VhLM
u3IpO'),
(3, 'Peyton', 'Manning', '$2b$04$Td8flEdr2zAJmV.8NtEXbeFgFd8qtYKe/GfjNUD0dfvrhojm
QCFiG');

insert into orders (id, product_id, quantity, user_id, order_status) values
(1, 4, 20, 1, 'active'),
(2, 1, 5, 2, 'complete'),
(3, 2, 20, 3, 'complete');