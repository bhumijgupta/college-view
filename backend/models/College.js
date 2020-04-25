const mongoose = require("mongoose");
const Student = require("../models/Student");

const collegeSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true },
  founded: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  studentsNum: { type: Number, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  courses: [{ type: String, required: true }],
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
