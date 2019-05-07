# Monthly-Commerce

## Overview

We created a grocery e-commerce app with powerful transactions happen between B2C model. The advantage of this app is the user can add products once in the month to the cart that initiates every month delivered to your home on choosing a particular date. the customer has free to without adding every month. We add an extra feature monthly cart, this app design by react front-end library.

## Dependencies and installation

    "name": "Monthly-Commerse_front-end",
    "version": "0.1.0",
    "private": true,

    "Dependencies"
    "@date-io/date-fns": "^1.2.0",
    "@material-ui/core": "^3.9.2",
    "@material-ui/icons": "^3.0.2",
    "@material-ui/styles": "^4.0.0-alpha.8",
    "axios": "^0.18.0",
    "date-fns": "^2.0.0-alpha.27",
    "formik": "^1.5.1",
    "jwt-decode": "^2.2.0",
    "material-ui": "^1.0.0-beta.47",

    "material-ui-pickers": "^2.2.4",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.5",
    "react-stars": "^2.2.5",
    "yup": "^0.27.0"

    "scripts":
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"

    "eslintConfig"
    "extends": "react-app"

    "browserslist"
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"

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
