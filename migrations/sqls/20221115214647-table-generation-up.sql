create table products (
    id serial primary key,
    name varchar(100) not null,
    price integer not null
);

create table users (
    id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    password varchar(100)
);

create table orders (
    id serial primary key,
    user_id bigint references users(id),
    order_status varchar(15)
);

create table ordered_products (
    id serial primary key,
    quantity integer,
    order_id bigint references orders(id),
    product_id bigint references products(id)
);