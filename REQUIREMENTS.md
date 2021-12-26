# API Requirements
 Create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## API Endpoints
#### Products
| Endpoint | Description |
|---|---|
| `[GET] /products` | Index | 
| `[GET] /products/:id` | Show (args: product id) |
| `[POST] /products` | Create (args: Product)[token required] | 
| `[GET] /products/five-most-popular`| Top 5 most popular products |
| `[GET] /products/:category`| Products by category (args: product category) |

#### Users
| Endpoint | Description |
|---|---|
| `[GET] /users` | Index [token required] | 
| `[GET] /users/:id` | Show (args: user id) [token required] | 
| `[POST] /users` | Create (args: User)[token required] | 
| `[DELETE] /users/:id` | Delete (args: user id)[token required] |

#### Orders
| Endpoint | Description |
|---|---|
| `[GET] /orders/user/:id/active` | Current Order by user (args: user id)[token required] |
| `[GET] /orders/user/:id/complete` | Completed Orders by user (args: user id)[token required] |

## Data Shapes
#### Product
```
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL,
category VARCHAR(64) NOT NULL
```
```
  Column  |         Type          | Collation | Nullable |               Default                
----------+-----------------------+-----------+----------+--------------------------------------
 id       | integer               |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(64) |           | not null | 
 price    | integer               |           | not null | 
 category | character varying(64) |           | not null | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

#### User
```
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
username VARCHAR(50),
password_digest VARCHAR
```
```
     Column      |          Type          | Collation | Nullable |              Default              
-----------------+------------------------+-----------+----------+-----------------------------------
 id              | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name      | character varying(100) |           |          | 
 last_name       | character varying(100) |           |          | 
 username        | character varying(50)  |           |          | 
 password_digest | character varying      |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

#### Orders
```
id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id bigint REFERENCES users(id)
```
```
 Column  |         Type          | Collation | Nullable |              Default               
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(15) |           |          | 
 user_id | bigint                |           |          | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

#### Order Products
```
id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
```
```
   Column   |  Type   | Collation | Nullable |                  Default                   
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          | 
 order_id   | bigint  |           |          | 
 product_id | bigint  |           |          | 
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```
