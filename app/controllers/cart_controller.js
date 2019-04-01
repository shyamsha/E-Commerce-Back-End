const express = require("express");
const router = express.Router();
const { Cart } = require("../models/carts");
const { authenticationByUser } = require("./middlewares/authenticate");
const { autherizationByUser } = require("./middlewares/autherization");

router.get("/", authenticationByUser, (req, res) => {
	const user = req.user;
	res.send(user.cart);
	// console.log(user, user._id);
	// user
	// 	.find()
	// 	.select("cart")
	// 	.then(cart => {
	// 		res.send(cart);
	// 	})
	// 	.catch(err => {
	// 		res.status(403).send({
	// 			statusText: "You are not authorized to access this URL"
	// 		});
	// 	});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const cartId = req.params.id;
	const user = req.user.cart;
	const userId = req.user._id;

	user.map(id => {
		if (id._id == cartId) {
			res.send(id);
		}
	});
});
router.post("/", authenticationByUser, (req, res) => {
	const body = req.body;
	const user = req.user;
	const cart = new Cart(body, user._id);
	let product = false;
	user.cart.map(productId => {
		if (productId.product == body.product) {
			product = true;
		}
	});
	if (product) {
		res.send({ statusText: "you allready added to cart" });
	} else {
		user.cart.push(cart);
		user
			.save()
			.then(user => {
				res.send({ statusText: "Added Sucessfully", cart });
			})
			.catch(err => {
				res.status(403).send({
					statusText: "You are not authorized to access this URL"
				});
			});
	}
});

router.put("/:id", authenticationByUser, (req, res) => {
	const user = req.user;
	const body = req.body;
	const id = req.params.id;
	user.cart.forEach(cart => {
		if (cart._id == id) {
			console.log(cart.quantity);
		}
	});
	// console.log(cart);

	user
		.updateOne(
			{
				$set: { cart: body }
			},
			{
				new: true
			}
		)
		.then(cart => {
			res.send(cart);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", authenticationByUser, (req, res) => {
	const user = req.user;
	const id = req.params.id;
	user.cart = user.cart.filter(cart => {
		return cart._id != id;
	});
	user.save().then(user => {
		res.send(user);
	});
});
module.exports = {
	cartController: router
};
