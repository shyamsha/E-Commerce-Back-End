const express = require("express");
const router = express.Router();
const { Cart } = require("../models/carts");
const { Product } = require("../models/products");
const { authenticationByUser } = require("./middlewares/authenticate");

router.get("/", (req, res) => {
	Cart.find()
		.then(cart => {
			if (cart.length != 0) {
				res.send(cart);
			} else {
				res.send([]);
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", (req, res) => {
	const id = req.params.id;
	const cart = new Cart(req.body);
	Promise.all([Product.findOne({ _id: id })]);
	cart
		.save()
		.then(cart => {
			res.send(cart);
		})
		.catch(err => {
			res.send(err);
		});
});

router.put("/:id", (req, res) => {
	Cart.findOneAndUpdate(
		{
			_id: req.params.id
		},
		{
			$set: req.body
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
router.delete("/:id", (req, res) => {
	Cart.findOneAndDelete({ _id: req.params.id })
		.then(cart => {
			res.send(cart);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	cartController: router
};
