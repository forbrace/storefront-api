# Storefront API

## Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Getting Started
1. Install all dependencies with `yarn install` or `npm install`.
2. Create `.env` file with the following content
```POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=password123
NODE_ENV=dev
BCRYPT_PASSWORD=your-secret-password
SALT_ROUND=10
TOKEN_SECRET=password321
```
3. Create database + user
```
psql postgres
CREATE USER storefront_user WITH PASSWORD 'password123';
CREATE DATABASE storefront_dev;
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storefront_user;
```
3. Install the global package `npm install -g db-migrate`
4. Install the package to the project `yarn add db-migrate db-migrate-pg`
5. Bring the migration up `db-migrate up`
6. Run `yarn start` for local development or `yarn build` to build the production bundle.
7. Open `http://0.0.0.0:3000`

## Testing
`yarn test`
