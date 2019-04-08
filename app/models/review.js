const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const reviewSchema = new Schema({
	title: {
		type: String,
		required: true,
		maxlength: 30
	},
	body: {
		type: String,
		required: true,
		minlength: 16,
		maxlength: 2024
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product"
	}
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = {
	Review
};
