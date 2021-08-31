const { Router } = require("express");
const router = Router();

const {
  getLocation,
  getLocationDay,
  getLocationData,
} = require("../controllers/weather");

router.get("/getLocation/:keyword", getLocation);
router.get("/getLocationData/:woeid", getLocationData);
router.get("/getLocationDay/:woeid/:year/:month/:day", getLocationDay);

module.exports = router;
