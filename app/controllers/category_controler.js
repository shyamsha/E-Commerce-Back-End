const express = require("express");
const router = express.Router();
const { Category } = require("../models/categorys");
//const { Product } = require("../models/products");

router.get("/", (req, res) => {
	Category.find()
		.then(category => {
			if (category.length != 0) {
				res.send(category);
			} else {
				res.send({});
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", (req, res) => {
	const id = req.params.id;

	Category.findOne({ _id: id })
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", (req, res) => {
	const category = new Category(req.body);
	category
		.save()
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
router.put("/:id", (req, res) => {
	Category.findOneAndUpdate(
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
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", (req, res) => {
	Category.findOneAndDelete({ _id: req.params.id })
		.then(category => {
			res.send(category);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	category_url: router
};
