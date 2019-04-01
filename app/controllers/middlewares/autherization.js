const { authenticationByUser } = require("../middlewares/authenticate");
function autherizationByUser(req, res, next) {
	if (authenticationByUser) {
		console.log(req.user);
		req.user.role.map(role => {
			if (role === "admin") {
				next();
			} else if (role === "user") {
				// CRUD - Create - POST , Read - GET , Update - PUT , Destroy - DELETE
				// Products
				if (req.url == "/carts") {
					if (req.method == "POST") {
						next();
					} else {
						res.status(403).send({
							notice: "You are not authorized to access this route"
						});
					}
				} else if (req.url == "/categories") {
				}

				// Categories
			}
		});
	}
}
module.exports = { autherizationByUser };
