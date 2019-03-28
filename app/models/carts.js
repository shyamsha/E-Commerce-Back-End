const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true
		}
	],
	quantity: {
		type: Number,
		min: 1,
		max: 50,
		required: true
	}
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = {
	Cart,
	cartSchema
};
