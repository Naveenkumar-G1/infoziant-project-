const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllTasks, createTask } = require("../controllers/taskController");

router.get("/", authMiddleware, getAllTasks);
router.post("/", authMiddleware, createTask);

module.exports = router;
