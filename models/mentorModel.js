const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    students:[{type:mongoose.Schema.Types.ObjectId, ref:"Student"}]
});

const mentorModel = mongoose.model("Mentor", mentorSchema);

module.exports = mentorModel;