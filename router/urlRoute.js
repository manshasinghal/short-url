const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetById,
  handleGetAnalytics
} = require("../controllers/urlControl");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);


router.get('/:shortId' ,  handleGetById)

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
