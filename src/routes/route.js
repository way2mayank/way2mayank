const router = require("express").Router();
const { customerRegister } = require("../controller/customerController");
const { createCard } = require("../controller/cardController")
// CUSTOMER CONTROLLER

router.post("/register", customerRegister);

//  CARD ROUTER

router.post("/card", createCard)

module.exports = router;
