const dotenv = require("dotenv"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  helmet = require("helmet"),
  morgan = require("morgan"),
  noCache = require("nocache"),
  mongoose = require("mongoose"),
  collegeRoute = require("./routes/college"),
  studentRoute = require("./routes/student"),
  PORT = process.env.PORT || 3000,
  app = express();

// ***************
// CONFIGURATION
// ***************

dotenv.config();
//Configuring the express instance
// Prevent misconfig headers
app.disable("x-powered-by");

// Prevent opening page in frame or iframe to protect from clickjacking
app.use(helmet.frameguard());

// Prevents browser from caching and storing page
app.use(noCache());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable all CORS requests
app.use(cors());

//If executing in test environment then prevent logging
if (process.env.NODE_ENV !== "test") {
  // log HTTP requests
  app.use(morgan("tiny"));
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ***************
// ROUTES
// ***************

app.use("/college", collegeRoute);
app.use("/student", studentRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
