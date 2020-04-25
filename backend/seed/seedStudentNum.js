const Student = require("../models/Student");
const mongoose = require("mongoose");
const College = require("../models/College");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected");
    normaliseClg();
  })
  .catch((err) => {
    console.log(err);
  });

let normaliseClg = () => {
  Student.aggregate([
    {
      $group: {
        _id: "$college_id",
        count: {
          $sum: 1,
        },
        ids: {
          $push: "$_id",
        },
      },
    },
  ]).then((data) => {
    data.forEach(({ _id, count, ids }, i) => {
      College.findByIdAndUpdate(
        { _id },
        { studentsNum: count, students: ids }
      ).then(() => {
        console.log(`Database ${i} updated `);
      });
    });
  });
};
