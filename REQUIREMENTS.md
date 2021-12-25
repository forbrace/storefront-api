# API Requirements
 Create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## API Endpoints
#### Products
- Index `[GET] /products`
- Show (args: product id) `[GET] /products/:id`
- Create (args: Product)[token required] `[POST] /products`
- Top 5 most popular products `[GET] /products/five-most-popular`
- Products by category (args: product category) `[GET] /products/:category`

#### Users
- Index [token required] `[GET] /users`
- Show (args: user id) [token required] `[GET] /users/:id`
- Create (args: User)[token required] `[POST] /users`
- Delete (args: user id)[token required] `[DELETE] /users/:id`

#### Orders
- Current Order by user (args: user id)[token required] `[GET] /orders/user/:id/active`
- Completed Orders by user (args: user id)[token required] `[GET] /orders/user/:id/complete`

## Data Shapes
#### Product
- id
- name
- price
- category

#### User
- id
- first_name
- last_name
- username
- password

#### Orders
- id
- status of order (active or complete)
- user_id

#### Order Products
- id
- quantity
- order_id
- product_id

