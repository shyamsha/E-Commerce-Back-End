const express = require("express");
const multer = require("multer");
//var upload = multer({ dest: "uploads/" }); //anthor way to upload
const router = express.Router();
const path = require("path");
const { Product } = require("../models/products");
const {
	authenticationByUser
} = require("../controllers/middlewares/authenticate");
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		//with out function callback use directely destination:"./public/uploads/"
		callback(null, "./public/uploads/");
	},
	filename: function(req, file, callback) {
		callback(null, Date.now() + "-" + file.originalname);
	}
});
// function fileFilter(req, file, callback) {
// 	if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
// 		// To accept the file pass `true`, like so:
// 		callback(null, true);
// 	} else {
// 		// To reject this file pass `false`, like so:
// 		callback(null, false);
// 	}
// 	// You can always pass an error if something goes wrong:
// 	callback(new Error("check image logic once"));
// }
var upload = multer(
	{ storage },
	{ limits: { fileSize: 1024 * 1024 * 5 } }
	//{ fileFilter }
);

router.get("/", (req, res) => {
	Product.find()
		.then(product => {
			if (product.length != 0) {
				res.send(product);
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

	Product.findOne({ _id: id })
		.then(product => {
			res.send(product);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/", upload.single("imageUrl"), (req, res) => {
	const dest = req.file.destination;
	const imagePath = "http://localhost:3001" + dest.slice(1) + req.file.filename;

	const product = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		stock: req.body.stock,
		category: req.body.category,
		imageUrl: imagePath
	});
	product
		.save()
		.then(product => {
			res.send(product);
		})
		.catch(err => {
			res.send(err);
		});
});

router.put("/:id", (req, res) => {
	Product.findOneAndUpdate(
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
		.then(product => {
			res.send(product);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", (req, res) => {
	Product.findOneAndDelete({ _id: req.params.id })
		.then(product => {
			res.send(product);
		})
		.catch(err => {
			res.send(err);
		});
});
module.exports = {
	product_url: router
};
