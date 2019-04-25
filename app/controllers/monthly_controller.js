const express = require("express");
const router = express.Router();
const { Monthly } = require("../models/monthlycart");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const { authenticationByUser } = require("./middlewares/authenticate");

router.get("/", authenticationByUser, (req, res) => {
	const user = req.user;
	User.findOne(user._id)
		.select("monthlyCart")
		.populate("monthlyCart.product")
		.then(monthlyCart => {
			res.send(monthlyCart);
		});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const monthlyCartId = req.params.id;
	const user = req.user.monthlyCart;
	const userId = req.user._id;

	user.forEach(id => {
		if (id._id == monthlyCartId) {
			res.send(id);
		}
	});
});
router.post("/", authenticationByUser, (req, res) => {
	const body = req.body;
	const user = req.user;
	const monthlyCart = new Monthly({
		body: body,
		userId: user._id
	});
	let product = false;
	user.monthlyCart.map(productId => {
		if (productId.product == body.product) {
			product = true;
		}
	});
	if (product) {
		res.send({ statusText: "you allready added to cart" });
	} else {
		user.monthlyCart.push(monthlyCart);
		user
			.save()
			.then(user => {
				res.send({ statusText: "Added Sucessfully" });
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

	user.monthlyCart.forEach(monthlyCart => {
		if (monthlyCart._id == id) {
			monthlyCart.quantity = body.quantity;
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
});
router.delete("/:id", authenticationByUser, (req, res) => {
	const user = req.user;
	const id = req.params.id;

	user.monthlyCart = user.monthlyCart.filter(monthlyCart => {
		return monthlyCart._id != id;
	});
	user.save().then(user => {
		res.send(user);
	});
});
module.exports = {
	monthlyCartController: router
};
