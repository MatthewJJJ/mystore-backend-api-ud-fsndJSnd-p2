create table orders (
    id serial primary key,
    user_id bigint references users(id),
    order_status varchar(15)
);