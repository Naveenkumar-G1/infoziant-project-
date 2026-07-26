const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

router.get("/", authMiddleware, getAllLeads);
router.post("/", authMiddleware, createLead);
router.put("/:id", authMiddleware, updateLead);
router.delete("/:id", authMiddleware, deleteLead);

module.exports = router;
