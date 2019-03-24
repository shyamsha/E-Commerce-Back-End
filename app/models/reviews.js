const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const reviewSchema = new Schema({
	title: {
		type: String,
		required: true,
		maxlength: 50
	},
	body: {
		type: String,
		required: true,
		maxlength: 2024
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true
	}
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = {
	Review
};
