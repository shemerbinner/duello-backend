const express = require("express");

const { log } = require("../../middlewares/logger.middleware");
const { getTrending, search } = require("./giphy.controller");
const router = express.Router();

router.get("/trending", log, getTrending);
router.get("/search", log, search);

module.exports = router;
