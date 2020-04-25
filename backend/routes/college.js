const express = require("express"),
  utils = require("../utils/college"),
  router = express.Router();

router.get("/name/:name", async (req, res) => {
  try {
    let college = await utils.getCollege(req.params);
    res.json({ college });
  } catch (err) {
    res.status(500);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    let college = await utils.getCollege(req.params);
    res.json({ college });
  } catch (err) {
    res.status(500);
  }
});

router.get("/state/:state", async (req, res) => {
  try {
    let college = await utils.getCollegeInState(req.params);
    res.json({ college });
  } catch (err) {
    res.status(500);
  }
});

router.get("/similar/:_id", async (req, res) => {
  try {
    let college = await utils.getSimilarCollege(req.params._id);
    res.json({ college });
  } catch (error) {
    res.status(500);
  }
});

router.get("/count/state", async (req, res) => {
  try {
    let college = await utils.countByState();
    res.json({ college });
  } catch (error) {
    res.status(500);
  }
});

router.get("/:id/students", async (req, res) => {
  try {
    let student = await utils.getStudentsInCollege(req.params.id);
    res.json({ students: student });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
