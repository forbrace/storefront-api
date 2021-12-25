##Postgres

```
/usr/local/opt/postgresql/bin/postgres -D /usr/local/var/postgres

psql postgres

CREATE USER shopping_user WITH PASSWORD 'password123';
CREATE DATABASE shopping;
GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;
\c shopping

CREATE TABLE plants (id SERIAL PRIMARY KEY, name VARCHAR(100), description text, individuals integer, sighting_date date);
INSERT INTO plants (name, description, individuals, sighting_date) VALUES ('Dandelion', 'Fuzzy yellow flowers', 5, '2021-10-10');
SELECT * FROM plants;
\d+ plants
UPDATE plants SET individuals = 8 WHERE id=1;
DELETE FROM plants WHERE id=1;

ALTER TABLE plants ADD FOREIGN KEY (region_id) REFERENCES region(id);
CREATE TABLE animals ( id SERIAL PRIMARY KEY, region_id REFERENCES regions(id)...);

CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR, email VARCHAR);
CREATE TABLE animals ( id SERIAL PRIMARY KEY, region_id REFERENCES regions(id), user_id REFERENCES users(id), individuals integer, sighting_date date, description text);

Filters
SELECT * FROM plants LIMIT 5;
SELECT name FROM plants WHERE sighting_date BETWEEN '2021-01-10' AND '2021-10-10' ;
SELECT name, description FROM plants WHERE name LIKE '%lion%';
SELECT name, id FROM plants WHERE sighting_date IS_NULL;
SELECT name, id FROM plants WHERE individuals IS_NOT_NULL;

ALTER DATABASE full_stack_test OWNER TO full_stack_user;

// SQL commands for sorting
SELECT * FROM products ORDER BY price DESC;
SELECT * FROM users ORDER BY name ASC;

// SQL Joins
SELECT * FROM products INNER JOIN order_products ON product.id = order_products.id;

// find all users who have created orders
SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;
We know that the orders table records the id of the user creating the order in the user_id column. If a user has ever made an order, their id has been recorded in the orders table as the the user_id of an order. So, this join looks for all user ids that show up in both of those tables to find the users who have made orders.
```

##Installing Jasmine

Add globally for CLI commands `npm install -g jasmine`
Add Jasmine and its Typescript types locally to `package.json` `yarn add jasmine @types/jasmine`
Run Jasmine initialization to get test structure `jasmine init`


## Adding API support for cart functionality.

1. Create the necessary tables and relationships
2. Create the models (Not all CRUD actions are required for this exercise)
3. Create the routes
4. EXTRA: Add logic to ensure that products cannot be added to orders that are closed.


##Migrations

### Instructions to install db-migrate

1. Install the global package `npm install -g db-migrate`
2. Install the package to the project `yarn add db-migrate db-migrate-pg`
3. Add a `database.json` reference file in the root of the project. Later, when we are working with multiple databases - this will allow us to specify what database we want to run migrations on. Here is an example database.json, you will just need to change the database names:
```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds",
    "user": "magical_user",
    "password": "password123"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds_test",
    "user": "test_user",
    "password": "password123"
  }
}
```
5. Create a migration `db-migrate create store-table --sql-file`
6. Add the SQL you need to the up and down sql files
7. Bring the migration up `db-migrate up`
8. Bring the migration down `db-migrate down`

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.
