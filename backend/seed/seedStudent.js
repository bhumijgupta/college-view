const Student = require("./models/Student");
const mongoose = require("mongoose");
const faker = require("faker");
const College = require("../models/College");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected");
    College.find({})
      .then((colleges) => {
        colleges.forEach((college, i) => {
          for (let i = 0; i < 100; i++) {
            seedStudent(college);
          }
          console.log(`College ${i} populated`);
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.log(err);
  });

let skills = ["C++", "Java", "NodeJS", "Cloud Computing", "Python", "Ruby"];

let getRandomCourse = (courses) => {
  let n = courses.length;
  if (n === 1) {
    return courses[0];
  } else {
    return courses[Math.round(Math.random() * (n - 1))];
  }
};

let getRandomSkills = () => {
  let n = skills.length;
  if (n == 1) {
    return [skills[0]];
  } else {
    let num = Math.round(Math.random() * n);
    if (num === 0) num++;
    let sIdx = new Set();
    for (let i = 0; i < num; i++) {
      let idx = Math.round(Math.random() * (n - 1));
      if (sIdx.has(idx)) {
        i--;
      } else {
        sIdx.add(idx);
      }
    }
    let skillArr = [];
    for (let idx of sIdx) {
      skillArr.push(skills[idx]);
    }
    return skillArr;
  }
};

let seedStudent = (college) => {
  let batch = 2020 + Math.round(Math.random() * 4);
  let course = getRandomCourse(college.courses);
  Student.create({
    id:
      String(college.id) +
      String(batch).substr(2) +
      course.substr(0, 2) +
      faker.random.alphaNumeric() +
      faker.random.alphaNumeric(),
    name: `${faker.name.firstName()}  ${faker.name.lastName()}`,
    batch,
    college_id: college._id,
    course,
    skills: getRandomSkills(),
  })
    .then(() => {})
    .catch((err) => console.log(err));
};
