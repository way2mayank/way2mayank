const router = require("express").Router();
const { customerRegister } = require("../controller/customerController");
// CUSTOMER CONTROLLER

router.post("/register", customerRegister);

module.exports = router;
