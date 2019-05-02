//db configuration

const mongoose = require("mongoose");
const path = "mongodb://localhost:27017/e_commerce";
const connection_uri = process.env.MONGODB_URI || process.env.CONNECT_URI;

mongoose.Promise = global.Promise;
mongoose
	.connect(connection_uri, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log("db connected succefully");
	})
	.catch(err => {
		console.log("Error connecting to DB", err);
	});
module.exports = {
	mongoose
};
