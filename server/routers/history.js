var express = require("express");
var router = express.Router();

// define the home page route
router.get("/", function (req, res) {
  res.json({ message: "History list will be here soon" });
});
// define the about route

module.exports = router;
