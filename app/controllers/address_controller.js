const express = require("express");
const router = express.Router();
const { Address } = require("../models/address");
const { authenticationByUser } = require("./middlewares/authenticate");
const { User } = require("../models/user");
router.get("/", authenticationByUser, (req, res) => {
	const user = req.user;
	User.findOne(user._id)
		.select("address")
		.then(address => {
			if (user.address.length != 0) {
				res.send(user.address);
			} else {
				res.send({ statusText: "Please add your address" });
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/:id", authenticationByUser, (req, res) => {
	const addressId = req.params.id;
	const address = req.user.address;

	address.forEach(addressItem => {
		if (addressItem._id == addressId) {
			res.send(addressItem);
		}
	});
});
router.post("/", authenticationByUser, (req, res) => {
	const user = req.user;
	const body = req.body;
	const address = new Address(body, user._id);
	user.address.push(address);
	user
		.save()
		.then(user => {
			res.send({ statusText: "Added Address succefuuly" });
		})
		.catch(err => {
			res.send(err);
		});
});

router.put("/:id", authenticationByUser, (req, res) => {
	const user = req.user;
	const body = req.body;
	const id = req.params.id;
	user.address.forEach(address => {
		if (address._id == id) {
			address.fullname = body.fullname;
			address.mobile = body.mobile;
			address.city = body.city;
			address.street = body.street;
			address.street = body.street;
			address.landmark = body.landmark;
			address.postalCode = body.postalCode;
		}
	});
	user
		.save()
		.then(user => {
			res.send({ statusText: "Updated Address succefuuly" });
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/:id", authenticationByUser, (req, res) => {
	const user = req.user;
	const id = req.params.id;
	user.address = user.address.filter(address => {
		return address._id != id;
	});
	user.save().then(user => {
		res.send({ statusText: "succefuuly deleted" });
	});
});
module.exports = {
	addressController: router
};
