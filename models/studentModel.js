const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mentor:{type:mongoose.Schema.Types.ObjectId, ref:"Mentor"},
    previousMentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
});

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;