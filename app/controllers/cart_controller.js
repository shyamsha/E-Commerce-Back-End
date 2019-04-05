const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart");
const { User } = require("../models/user");
const { authenticationByUser } = require("./middlewares/authenticate");
const { autherizationByUser } = require("./middlewares/autherization");

router.get("/", authenticationByUser, (req, res) => {
	const user = req.user;

	User.findOne(user._id)
		.select("cart")
		.populate("cart.product")
		.then(cart => {
			res.send(cart);
		});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const cartId = req.params.id;
	const cart = req.user.cart;
	const userId = req.user._id;

	cart.forEach(cartItem => {
		if (cartItem._id == cartId) {
			res.send(cartItem);
		}
	});
});
router.post("/", authenticationByUser, (req, res) => {
	const body = req.body;
	const user = req.user;
	const cart = new Cart(body);

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
			cart.quantity = body.quantity;
		}
	});

	user
		.save()
		.then(user => {
			res.send(user);
		})
		.catch(err => {
			res.send(err);
		});

	// user
	// 	.update(
	// 		{ _id: id },
	// 		{
	// 			$set: { "cart.$.qunatity": body }
	// 		},
	// 		{
	// 			new: true
	// 		}
	// 	)
	// 	.then(cart => {
	// 		res.send(cart);
	// 	})
	// 	.catch(err => {
	// 		res.send(err);
	// 	});
});
router.delete("/:id", authenticationByUser, (req, res) => {
	const user = req.user;
	const id = req.params.id;
	user.cart = user.cart.filter(cart => {
		return cart._id != id;
	});
	user.save().then(user => {
		res.send({ statusText: "succefuuly deleted" });
	});
});
module.exports = {
	cartController: router
};
