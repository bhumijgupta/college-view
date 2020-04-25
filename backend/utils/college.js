const College = require("../models/College");

let getCollege = (query) => {
  return new Promise((resolve, reject) => {
    College.findOne(query, { students: 0 })
      .then((college) => {
        resolve(college);
      })
      .catch((err) => reject({ err }));
  });
};

let getCollegeInState = (state) => {
  return new Promise((resolve, reject) => {
    College.find(state, {
      id: 1,
      name: 1,
    })
      .then((college) => {
        resolve(college);
      })
      .catch((err) => reject(err));
  });
};

let getSimilarCollege = (_id) => {
  return new Promise((resolve, reject) => {
    College.findById(_id)
      .then((college) => {
        College.find(
          {
            state: college.state,
            courses: { $all: college.courses },
          },
          {
            name: 1,
            id: 1,
            city: 1,
          }
        ).then((colleges) => {
          resolve(colleges);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let countByState = () => {
  return new Promise((resolve, reject) => {
    College.aggregate([
      {
        $group: {
          _id: "$state",
          count: {
            $sum: 1,
          },
        },
      },
    ])
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

let getStudentsInCollege = (id) => {
  return new Promise((resolve, reject) => {
    College.findOne(
      { id },
      {
        students: 1,
      }
    )
      .populate("students", ["id", "name"])
      .exec((err, students) => {
        console.log(err);
        if (err) reject(err);
        else resolve(students.students);
      });
  });
};
module.exports = {
  getCollege,
  getSimilarCollege,
  countByState,
  getCollegeInState,
  getStudentsInCollege,
};
