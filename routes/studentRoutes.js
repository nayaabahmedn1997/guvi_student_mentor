
const express = require("express");
const { createStudent, changeMentor, getPreviousMentor } = require("../controllers/studentController");
const router = express.Router();

console.log(3);
// POST: Create a new student
router.post("/create-student", createStudent);
router.post("/change-mentor", changeMentor);
router.get("/previous-mentor",getPreviousMentor);
module.exports = router;
