const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("./config/db_connect");
const { category_url } = require("./app/controllers/category_controler");
const { product_url } = require("./app/controllers/product_controller");
const { user } = require("./app/controllers/user_controler");
const { review_controler } = require("./app/controllers/review_controller");
app.use(express.json());
app.use(cors());
app.use("/public/uploads", express.static("public/uploads"));
app.use("/categories", category_url);
app.use("/products", product_url);
app.use("/reviews", review_controler);
app.use("/user", user);
app.get("/", (req, res) => {
	res.send("Welcome to your E-Commerce");
});
app.use(function(req, res) {
	// res.sendStatus(404);
	res.status(404);
	res.send("The resource you are looking for doesn’t exist.");
});

app.listen(port, () => {
	console.log("listining from", port);
});
