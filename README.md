##### Base URL:

http://localhost/api

### Technology Installation

-   Install Node and NPM
-   Install Postgres so you can stand up a postgres database
-   Setup Postgres server running on default port on the local machine
-   Run `npm install` to install all needed dependencies

### Database Setup

-   Create two databases my_store and my_store_test
-   Install migration libraries
    `npm install -g db-migrate db-migrate-pg`
-   Run migrations for test and dev
    `db migrate up`
    `db-migrate up --config database.json -e test`
-   At this point you should have a my_store and my_store_test database with all of the necessary test data provisioned

### Environment Variables

-   Create a .env file and put the following in it

HOST=127.0.0.1
DATABASE=my_store
TEST_DATABASE=my_store_test
USER=postgres
PASSWORD=
SECRET=asjdfklasjf7234823748&\*@

### Testing the Code (Manually)

-   I've provider a Postman collection in the repository with a valid JWT that each call needing JWT auth inherits
-   Import and execute the Postman requests in sequence and functionality should be easily tested (provided database was set up)
-   JSON file is named `storefront-api-requests.postman_collection.json`

**_Note: You can also perform manually testing by making request to base url but Postman Collection has all of the requests already formatted..._**

### Testing the Code with Scripts

-   Run `npm run test` to run the testing suite
-   Note: Make sure regular server is stopped as test server will attempt to run on same port
