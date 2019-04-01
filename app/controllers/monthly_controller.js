const express = require("express");
const router = express.Router();
const { Monthly } = require("../models/monthlycarts");
const { Product } = require("../models/products");
const { authenticationByUser } = require("./middlewares/authenticate");

router.get("/", (req, res) => {
	Monthly.find()
		.then(monthly => {
			if (monthly.length != 0) {
				res.send(monthly);
			} else {
				res.send([]);
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", (req, res) => {
	Monthly.findOne(req.params.id)
		.then(monthly => {
			res.send(monthly);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", (req, res) => {
	const id = req.params.id;
	const monthly = new Monthly(req.body);
	Promise.all([Product.findOne({ _id: id })]);
	monthly
		.save()
		.then(monthly => {
			res.send(monthly);
		})
		.catch(err => {
			res.send(err);
		});
});

router.put("/:id", (req, res) => {
	Monthly.findOneAndUpdate(
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
		.then(monthly => {
			res.send(monthly);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", (req, res) => {
	Monthly.findOneAndDelete({ _id: req.params.id })
		.then(monthly => {
			res.send(monthly);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	monthlyCartController: router
};
