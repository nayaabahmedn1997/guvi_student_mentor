const mentorModel = require("../models/mentorModel");
const studentModel = require("../models/studentModel");

// Create a new student
const createStudent = async (req, res) => {
  try {
    console.log(5);
    const { name, email } = req.body;
    const newStudent = new studentModel({ name, email });
    await newStudent.save();
    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeMentor = async (req, res)=>{
  try {
    const {studentId, newMentorId} =req.body;

    const student  = await studentModel.findById(studentId);
    if(!student)
    {
      return res.status(400).json({
        "message":"Student doesn't exists"
      })
    }
    const newMentor =await mentorModel.findById(newMentorId);
    if(!newMentor)
      {
        return res.status(400).json({
          "message":"Mentor doesn't exists"
        })
      }
    
    //Check if student had any  mentor
    if(student.mentor)
    {
      const previousMentor = await mentorModel.findById(student.mentor);
      if(previousMentor)
      {
        previousMentor.students = previousMentor.students.filter((id)=>id.toString() !== studentId);
        await previousMentor.save();
      }
    }

    //Change students mentor
    student.previousMentor = student.mentor;
    student.mentor = newMentorId;
    await student.save();

    //add the student to mentor
    newMentor.students.push(studentId);
    await newMentor.save();

    return res.status(200).json({
      "message":"Mentor changed successfully"
    })

    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error:error.message
    })
  }
}

const getPreviousMentor = async (req, res)=>{
  try {
    const {studentId} = req.body;
    
    const student = await studentModel.findById(studentId).populate("previousMentor");
    if(!student)
    {
      return res.status(404).json({
        "message":"Student doesn't exists"
      })
    }
    if(!student.previousMentor)
    {
      return res.status(404).json({
        "message":"The student doesn't have previous mentor"
      })
    }

    return res.status(200).json({
      previousMentor:student.previousMentor
    });
    
  } catch (error) {
    return res.status(500).json({
      error:error.message
    })
  }
}

module.exports = { createStudent, changeMentor, getPreviousMentor};
