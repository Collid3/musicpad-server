const router = require("express").Router();
const userController = require("../controller/user");

router.route("/").post(userController.createUser);

module.exports = router;
