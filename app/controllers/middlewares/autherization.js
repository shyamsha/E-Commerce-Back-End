const { authenticationByUser } = require("../middlewares/authenticate");
function autherizationByUser(req, res, next) {
	if (authenticationByUser) {
		req.user.role.map(role => {
			if (role === "admin") {
				next();
			// } else if (role === "user") {
			// 	// CRUD - Create - POST , Read - GET , Update - PUT , Destroy - DELETE
			// 	// Products
			// 	if (req.url == "/carts") {
			// 		if (req.method == "POST") {
			// 			next();
			// 		} else {
			// 			res.status(403).send({
			// 				notice: "You are not authorized to access this route"
			// 			});
			// 		}
			// 	}
			// 	// Categories
			}
		});
	}
}
module.exports = { autherizationByUser };
