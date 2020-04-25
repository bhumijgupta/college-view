const Student = require("../models/Student");

let getStudent = (_id) => {
  return new Promise((resolve, reject) => {
    Student.findById(_id)
      .populate("college_id", ["id", "name"])
      .exec((err, student) => {
        if (err) reject(err);
        else resolve(student);
      });
  });
};

module.exports = { getStudent };
