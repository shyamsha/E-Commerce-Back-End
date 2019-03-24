const express = require("express");
const router = express.Router();
const {
	authenticationByUser
} = require("../controllers/middlewares/authenticate");

const { User } = require("../models/users");

router.post("/register", (req, res) => {
	const user = new User(req.body);
	user
		.save()
		.then(user => {
			res.send(user);
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/login", (req, res) => {
	const body = req.body;
	//static method
	User.findByCredentials(body.email, body.password)
		.then(user => {
			//instance method
			return user.generateByToken();
			//res.send(" successfully logedin ");
		})
		.then(token => {
			//res.header("x-auth", token).send();
			res.send(token);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/logout", authenticationByUser, (req, res) => {
	const tokenData = req.token;
	User.findOne(
		{ _id: req.user._id },
		{ $pull: { tokens: { token: tokenData } } }
	)
		.then(user => {
			user.save().then(user => {
				res.send("suceessfully logout");
			});
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/logoutall", authenticationByUser, (req, res) => {
	let token = req.token;
	User.findOne(
		{ _id: req.user._id },
		//{ $pull: { tokens: { token: token } } },
		{ $set: { tokens: { token: [] } } }
	)
		.then(user => {
			// 	for (let i = 0; i < user.tokens.length; i++) {
			// 		if (token == user.tokens[i].token) {
			// 			user.tokens.splice(0);
			// 		}
			// 	}
			user.save().then(user => {
				res.send({ notice: "suceessfully logout from all devices" });
			});
		})
		.catch(err => {
			res.send(err);
		});
});
// router.delete("/logout", authenticationByUser, (req, res) => {
// 	const token = req.header("x-auth");
// 	console.log(token);
// 	User.findOne({ "tokens.token": token })
// 		.then(user => {
// 			user.tokens = user.tokens.filter(item => {
// 				return item.token != token;
// 			});
// 			user.save().then(user => {
// 				res.send({ notice: "succcefully loged out" });
// 			});
// 		})
// 		.catch(err => {
// 			res.send(err);
// 		});
// });

module.exports = {
	user: router
};
