const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllCustomers,
  createCustomer,
} = require("../controllers/customerController");

router.get("/", authMiddleware, getAllCustomers);
router.post("/", authMiddleware, createCustomer);

module.exports = router;
