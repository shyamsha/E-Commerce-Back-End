const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	orderAt: {
		type: Date,
		default: Date.now
	},
	orderNumber: {
		type: String,
		required: true
	},
	totalOrders: {
		type: Number,
		required: true
	},
	lineItems: [
		{
			cart: {
				type: Schema.Types.ObjectId,
				ref: "Cart"
			}
		}
	]
});
const Order = mongoose.model("Order", orderSchema);
module.exports = {
	Order
};
