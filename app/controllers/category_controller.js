const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { authenticationByUser } = require("./middlewares/authenticate");
const { autherizationByUser } = require("./middlewares/autherization");
const { Product } = require("../models/product");

router.get("/", (req, res) => {
	Category.find()
		.then(category => {
			if (category.length != 0) {
				res.send(category);
			} else {
				res.send([]);
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", (req, res, next) => {
	const id = req.params.id;

	Promise.all([
		Category.findOne({ _id: id }),
		Product.find({ category: id })
	]).then(values => {
		res.send({
			category: values[0],
			products: values[1]
		});
	});
});

router.post("/", authenticationByUser, autherizationByUser, (req, res) => {
	const category = new Category(req.body, req.user._id);
	// category.user= req.user._id
	category
		.save()
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
router.put("/:id", authenticationByUser, autherizationByUser, (req, res) => {
	Category.findOneAndUpdate(
		req.user._id,
		{
			_id: req.params.id
			// userId: req.user._id
		},
		{
			$set: req.body
		},
		{
			new: true
		}
	)
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", authenticationByUser, autherizationByUser, (req, res) => {
	Category.findOneAndDelete({ _id: req.params.id }, req.user._id)
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	categoryController: router
};
