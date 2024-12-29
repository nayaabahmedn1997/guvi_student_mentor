const mentorModel = require("../models/mentorModel");
const studentModel = require("../models/studentModel");

// Create a new mentor
const createMentor = async (req, res) => {
  try {
    console.log("1");
    const { name, email } = req.body;
    const existingMentor = await mentorModel.findOne({email});
    if(existingMentor)
    {
        return res.status(400).json({
            "message":"Mentor already exists"
        })
    }
    const newMentor = new mentorModel({ name, email });
    await newMentor.save();
    res.status(201).json({ message: "Mentor created successfully", mentor: newMentor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const assignStudentsToMentor = async (req, res)=>{
  try {
    const {mentorId, studentIds} = req.body;

    // Find mentor
    const mentor = await mentorModel.findById(mentorId);
    if(!mentor)
    {
      return res.status(400).json({
        "message":"Mentor not found"
      })
    }

    //assign student to the mentor
    const students = await studentModel.find({_id:{$in:studentIds}});
    students.forEach(async (student)=>{
      student.previousMentor = student.mentor;
      student.mentor = mentor._id;
      await student.save();
    });

    //Add the student IDs to mentor
    mentor.students.push(...studentIds);
    await mentor.save();
    return res.status(200).json({
      "message":"Students assigned successfully"
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}


const getStudentsByMentor = async (req, res)=>{
  try {
    const {mentorId} = req.body;
    const mentor = await mentorModel.findById(mentorId).populate("students");
    if(!mentor)
    {
      return res.status(400).json({
        "message":"Mentor not found"
      })
    }
    return res.status(200).json({
      students: mentor.students
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}
module.exports = { createMentor, assignStudentsToMentor, getStudentsByMentor};
