const express = require("express"),
  utils = require("../utils/student"),
  router = express.Router();

router.get("/:_id", async (req, res) => {
  try {
    let student = await utils.getStudent(req.params._id);
    res.json({ student });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
