const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { User } = require("../models/user");
const { authenticationByUser } = require("./middlewares/authenticate");
router.get("/", authenticationByUser, (req, res) => {
	const user = req.user;
	User.find(user._id)
		.populate("order.lineItems.product")
		.select("order")
		.then(order => {
			res.send(order);
		});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const id = req.params.id;
	const user = req.user;
	Order.findOne({
		_id: id,
		userId: user._id
	})
		.then(order => {
			res.send(order);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", authenticationByUser, (req, res) => {
	let user = req.user;
	let body = req.body;
	let id = (req.params = user._id);

	body.user = user._id;
	body.orderNumber = "DCT-" + user._id + Math.round(Math.random() * 1000000);
	body.totalOrders = user.cart.length;
	body.lineItems = [];

	User.findOne({ _id: id })
		.select("cart")
		.populate("cart.product")
		.then(r => {
			r.cart.forEach(product => {
				body.lineItems.push({
					product: product.product._id,
					quantity: product.quantity,
					price: product.product.price
				});
			});
			const order = new Order(body, user._id);

			if (r.cart.length != 0) {
				user.order.push(order);
				user.cart = [];
			} else {
				res.send({ statusText: "Please add products to cart" });
			}

			user
				.save()
				.then(order => {
					res.send({
						statusText: "Thank you for Buying we will happy to help you"
					});
				})
				.catch(err => {
					res.send(err);
				});
		});
});
module.exports = {
	orderController: router
};
