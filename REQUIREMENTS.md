# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

##### Base URL:

http://localhost/api

#### Products

- Index: [GET] /products
- Show: [GET] /products?id=prod_id
- Create: [POST] /products
  - Requires a request header including auth token...

#### Users

- Index: [GET] /users
- Show: [GET] /users?id=user_id
- Create: [POST] /users
  - Requires a request header including auth token...

#### Orders

- Current Order by user: [GET] /orders?id=user_id
  - Requires a request header including auth token...

## Data Shapes

#### Product

- id - PRIMARY SERIAL KEY
- name - VARCHAR
- price - INTEGER

#### User

- id PRIMARY SERIAL KEY
- firstName - VARCHAR
- lastName - VARCHAR
- password - VARCHAR

#### Orders

- id - PRIMARY SERIAL KEY
- id of each product (foreign key from product table)
- quantity of each product in the order - INTEGER
- user_id (foreign key from product table)
- status of order (active or complete) - VARCHAR
