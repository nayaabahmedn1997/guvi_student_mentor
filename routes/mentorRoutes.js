const express = require("express");
const { createMentor, assignStudentsToMentor, getStudentsByMentor } = require("../controllers/mentorController");
const mentorRouter = express.Router();

mentorRouter.post("/create-mentor", createMentor);
mentorRouter.post("/assign-students", assignStudentsToMentor);
mentorRouter.get("/getStudents", getStudentsByMentor);
module.exports = mentorRouter;
