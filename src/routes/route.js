const router = require("express").Router();
const { customerRegister, getCostumer, deleteCustomer } = require("../controller/customerController");
const { createCard, getDetail } = require("../controller/cardController")
// CUSTOMER CONTROLLER

router.post("/register", customerRegister);
router.get("/customer/:id", getCostumer);
router.delete("/customer/:id", deleteCustomer);

//  CARD ROUTER

router.post("/card", createCard)
router.get("/card/:id", getDetail)

module.exports = router;
