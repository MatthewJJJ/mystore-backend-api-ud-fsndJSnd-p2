# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

##### Base URL:

http://localhost/api

#### Products

-   Index: [GET] /products
-   Show: [GET] /products?id=prod_id
-   Create: [POST] /products
    (request requires token authorization)

#### Users

-   Index: [GET] /users
    (request requires token authorization)
-   Show: [GET] /users?id=user_id
    (request requires token authorization)
-   Create: [POST] /users
    (request returns a token to be used by the user later)
-   Login: [POST] /login
    (request generates a token for a user given they have enter the correct password)

#### Orders

-   Current Order by user: [GET] /orders?id=user_id
    (request requires token authorization)

**Note if you want something to be return by this you need to run a script in the database. No create / post route was required.**

## Data Shapes

#### Product

-   id - SERIAL PRIMARY KEY
-   name - VARCHAR
-   price - INTEGER

#### User

-   id SERIAL PRIMARY KEY
-   firstName - VARCHAR
-   lastName - VARCHAR
-   password - VARCHAR

#### Orders

-   id - SERIAL PRIMARY KEY
-   user_id (foreign key from product table)
-   status of order (active or complete) - VARCHAR

#### Ordered Products

-   id - SERIAL PRIMARY KEY
-   quantity - INTEGER
-   order_id (foreign key from orders)
-   product_id (foreign key from products)
