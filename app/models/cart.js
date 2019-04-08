const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product"
	},
	quantity: {
		type: Number,
		min: 1,
		max: 50
	}
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = {
	Cart,
	cartSchema
};
