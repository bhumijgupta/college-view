const mongoose = require("mongoose");
const College = require("./College");

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
