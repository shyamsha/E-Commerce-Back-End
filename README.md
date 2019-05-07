# Monthly-Commerce

## Overview

We created a grocery e-commerce app with powerful transactions happen between B2C model. The advantage of this app is the user can add products once in the month to the cart that initiates every month delivered to your home on choosing a particular date. the customer has free to without adding every month. We add an extra feature monthly cart, this app design by react front-end library.

## Dependencies and installation

"name": "e-commerce_backend",
"version": "1.0.0",
"description": "E_Commerce",
"main": "index.js",

"test": "echo \"Error: no test specified\" && exit 1"

"license": "ISC",
"dependencies":
"aws-sdk": "^2.443.0",
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"express": "^4.16.4",
"express-validator": "^5.3.1",
"jsonwebtoken": "^8.5.0",
"jwt-decode": "^2.2.0",
"mongoose": "^5.4.5",
"multer": "^1.4.1",
"multer-s3": "^2.9.0",
"validator": "^10.11.0"

"devDependencies":
"dotenv": "^7.0.0"

## Usage

## `create, edit and delete Categories`

- Catrgories
  - see the list of all categories and on click to see more about each category.
- Add Category
  - Create a new category with the name.
- Edit Category
  - Change the name of category and update state.
- Delete Category
  - Delete the category permanently and update state.

## `create, edit and delete Products`

- products
  - see the list of all products and on click to see more about each product.
- Add Product
  - Create a new product with the required details.
- Edit Product
  - Change the details of the product and update the state.
- Delete Product

  - Delete the category permanently update state.

## `create, edit and delete Addresses`

- Addresses
  - see the list of all Addresses and on click to see more about each Address.
- Add Address
  - Create a new Address with required details.
- Edit Address
  - Change the details of Address and update state.
- Delete Address

  - Delete the Address permanently update state.

## `create and delete Reviews`

- Reviews
  - see the list of all Reviews.
- Add Reviews
  - Create new Reviews with required details.
- Delete Reviews

  - Delete the Reviews permanently update state.

## `create, edit and delete Cart`

- Carts
  - see the list of all Cart items and on click to see more about each Cart item.
- Add Cart
  - The product adds to cart with required details.
- Edit Cart
  - Change the quantity of Cart item and update the state.
- Delete Cart

  - Delete the Cart permanently in cart line items and update state.

## `create, edit and delete Monthly Cart`

- Monthly Carts
  - see the list of all Monthly Cart items and on click to see more about each Monthly Cart item.
- Add Cart
  - The product adds to Monthly Cart with required details.
- Edit Cart
  - Change the quantity of Monthly Cart item and update the state.
- Delete Cart

  - Delete the Monthly Cart permanently in cart line items and update state.

## `create Place Order in cart line items`

- place order
  - Click on the place order its goto select address.
- Select Address
  - When you choose the one of the address and click on the proceed to buy.
- Proceed to Buy
  - It goto another third-party payment gateway choose the payment method.
- Successfully Purchase

  - A pop window comes while successfully purchase `Thank you for Purchasing our products, we happy to help you`.

## `create Place Order in monthly cart line items`

- place order
  - Click on the place order it's goto select address and pops up window subscribe.
- Subscribe
  - Are you sure about purchasing this product every monthly? please enter your email address and pickup date here. We
    will send updates occasionally. please Subscribe to agree on terms and conditions.
- Select Address
  - When you choose the one of the address and click on the proceed to buy.
- Proceed to Buy
  - It goto another third-party payment gateway choose the payment method.
- Successfully Purchase

  - A pop window comes while successfully purchase `Thank you subscribe our products on a monthly basis, we happy to help you`.

## `get all previous purchase order history`

- Get Orders
  - Click on the orders it's goto orders history and sees each purchased product.
- Invoice

  - click on the invoice to see your billing details.

## Authors

1.  [syam cherukuri](https://shyamsha.github.io)
2.  gurupavan m
