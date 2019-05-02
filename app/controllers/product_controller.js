const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

//var upload = multer({ dest: "uploads/" }); //anthor way to upload
const router = express.Router();
const path = require("path");
const { Product } = require("../models/product");
const {
	autherizationByUser
} = require("../controllers/middlewares/autherization");
const {
	authenticationByUser
} = require("../controllers/middlewares/authenticate");
const { Category } = require("../models/category");
aws.config.update({
	// Your SECRET ACCESS KEY from AWS should go here,
	// Never share it!
	// Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY

	secretAccessKey: process.env.SECRETACCESS_KEY,
	// Not working key, Your ACCESS KEY ID from AWS should go here,
	// Never share it!
	// Setup Env Variable, e.g: process.env.ACCESS_KEY_ID

	accessKeyId: process.env.ACCESS_KEYID,
	region: "us-east-1" // region of your bucket
});

const s3 = new aws.S3();

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "monthly-commerce",
		acl: "public-read",
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, Date.now().toString() + file.originalname);
		}
	})
});
// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		//with out function callback use directely destination:"./public/uploads/"
// 		callback(null, "./public/uploads/");
// 	},
// 	filename: function(req, file, callback) {
// 		callback(null, Date.now() + "-" + file.originalname);
// 	}
// });
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
// var upload = multer(
// 	{ storage },
// 	{ limits: { fileSize: 1024 * 1024 * 5 } }
// 	//{ fileFilter }
// );
// router.post("/", upload.single("imageUrl"), function(req, res, next) {
// 	console.log(req.file);
// 	res.send("Successfully uploaded " + req.file.location + " file!");
// });

router.get("/", (req, res) => {
	Product.find()
		//.select("name") //select particuler fieldset
		.populate("category") // give all category filds
		.then(products => {
			res.send(products);
		});
});
router.get("/:id", (req, res) => {
	Product.findById(req.params.id)
		.populate("category")
		.then(product => {
			res.send(product);
		})

		.catch(err => {
			res.send(err);
		});
});

router.post(
	"/",
	authenticationByUser,
	autherizationByUser,
	upload.single("imageUrl"),
	(req, res) => {
		// const dest = req.file.destination;
		// const imagePath =
		// 	"http://localhost:3001" + dest.slice(1) + req.file.filename;
		const user = req.user;
		const product = new Product(
			{
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				stock: req.body.stock,
				isCod: req.body.isCod,
				category: req.body.category,
				imageUrl: req.file.location
			},
			req.user._id
		);

		product
			.save()
			.then(product => {
				res.send(product);
			})
			.catch(err => {
				res.status(500).send({ statusText: "internal server error" });
			});
	}
);

router.put(
	"/:id",
	upload.single("imageUrl"),
	authenticationByUser,
	autherizationByUser,
	(req, res) => {
		// const dest = req.file.destination;
		// const imagePath =
		// 	"http://localhost:3001" + dest.slice(1) + req.file.filename;
		const user = req.user._id;
		Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					name: req.body.name,
					description: req.body.description,
					price: req.body.price,
					stock: req.body.stock,
					isCod: req.body.isCod,
					category: req.body.category,
					imageUrl: req.file.location
				}
			},
			{
				new: true
			}
			// req.user._id
		)
			.then(product => {
				res.send(product);
			})
			.catch(err => {
				res.status(500).send({ statusText: "internal server error" });
			});
	}
);
router.delete("/:id", authenticationByUser, autherizationByUser, (req, res) => {
	const user = req.user;
	Product.findOneAndDelete({ _id: req.params.id }, req.user._id)
		.then(product => {
			res.send(product);
		})
		.catch(err => {
			res.status(500).send({ statusText: "internal server error" });
		});
});

module.exports = {
	productController: router
};
