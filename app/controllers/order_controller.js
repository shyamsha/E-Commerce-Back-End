const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { authenticationByUser } = require("./middlewares/authenticate");
router.get("/", authenticationByUser, (req, res) => {
	const user = req.user;
	Order.find(user._id)
		.then(order => {
			if (order.length != 0) {
				res.send(order);
			} else {
				res.send([]);
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const id = req.params.id;
	const user = req.user;
	Order.findOne({
		_id: id,
		id: user._id
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
	console.log(user.populate("cart.product"));
	let body = req.body;
	cart = user.cart.forEach(cart => {
		//console.log(cart);
	});
	const orderPlaced = {
		user: user._id,
		orderNumber: "DCT-1",
		totalOrders: user.cart.length,
		lineItems: user.cart,
		date: Date.now
	};
	console.log(orderPlaced);
	const order = new Order({ id: user._id, user: orderPlaced });

	order
		.save()
		.then(order => {
			console.log(order);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	orderController: router
};
