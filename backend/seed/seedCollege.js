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
    for (let i = 0; i < 100; i++) {
      seedCollege();
    }
    // getRandomCourse();
    // console.log(states.length);
  })
  .catch((err) => {
    console.log(err);
  });

let getRandomCourse = () => {
  let num = Math.round(Math.random() * 4);
  if (num === 0) num++;
  let cIdx = new Set();
  for (let i = 0; i < num; i++) {
    let num = Math.round(Math.random() * 3);
    if (cIdx.has(num)) {
      i--;
    } else {
      cIdx.add(num);
    }
  }
  let course = [];
  for (let idx of cIdx) {
    course.push(courses[idx]);
  }
  return course;
  //   console.log(course);
};
let courses = ["Computer Science", "Electronics", "IT", "Mechanical"];
let states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

let seedCollege = () => {
  College.create({
    id: faker.random.number(),
    name: faker.company.companyName() + " University",
    founded: Math.round(Math.random() * 20) + 1990,
    city: faker.address.city(),
    state: states[Math.round(Math.random() * 35)],
    country: "India",
    studentsNum: 0,
    courses: getRandomCourse(),
  })
    .then(() => {
      console.log("inserted");
    })
    .catch((err) => {
      console.log(err);
    });
};
