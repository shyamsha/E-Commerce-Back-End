const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const addressSchema = new Schema({
	fullName: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true,
		minlength: 10,
		validate: {
			validator: function(value) {
				return validator.isInt(value);
			},
			message: function() {
				return "invalid mobile number format";
			}
		}
	},
	city: {
		type: String,
		required: true,
		maxlength: 20
	},
	street: {
		type: String,
		required: true,
		maxlength: 256
	},
	landmark: {
		type: String,
		required: true,
		maxlength: 50
	},
	postalCode: {
		type: String,
		minlength: 6,
		maxlength: 6,
		validate: {
			validator: function(value) {
				return validator.isInt(value);
			},
			message: function() {
				return "invalid postalCode format";
			}
		}
	}
});
const Address = mongoose.model("Address", addressSchema);
module.exports = {
	Address
};
