##### Base URL:

http://localhost/api

### Technology Installation

-   Install Node and NPM
-   Install Postgres so you can stand up a postgres database
-   Setup Postgres server running on default port on the local machine
-   Run `npm install` to install all needed dependencies

### Environment Variables

-   Update .env file and correct values in it. Example:

HOST=127.0.0.1
DATABASE=my_store
TEST_DATABASE=my_store_test
USER=postgres
PASSWORD=
SECRET=asjdfklasjf7234823748&\*@

-   Update database.json with your password if you have one for postgres user

**Note: MAKE SURE THAT SECRET IS THE SAME AS EXAMPLE OR JWTS WILL NOT WORK!!!**

### Database Setup

-   Database is running on default Postgres port (5432)
-   You must create two databases:
    my_store
    my_store_test
    on your default Postgres server
-   Install migration libraries
    `npm install -g db-migrate db-migrate-pg`
-   Run migrations for test and dev
    `db-migrate up`
    `db-migrate up --config database.json -e test`
-   At this point you should have a my_store and my_store_test database with the current tables provisioned
-   You should also have the right test data provisioned in the database so the Postman Collection requests should return some data

**Note: Make sure to check the password! Also, check the password in database.json**

### Testing the Code (Manually)

-   I've provided a Postman collection in the repository with a valid JWT that each call needing JWT auth inherits
-   Import and execute the Postman requests in sequence and functionality should be easily tested (provided database was set up)
-   JSON file is named `storefront-api-requests.postman_collection.json`

**Note: You can also perform manually testing by making request to base url but Postman Collection has all of the requests already formatted...\_**

### Testing the Code with Scripts

-   Run `npm run test` to run the testing suite
-   Note: Make sure regular server is stopped as test server will attempt to run on same port
