const express = require("express");
const { body } = require("express-validator");

const scanController = require("../controllers/scan");

const router = express.Router();

router.post("/scan", [
    body("imagePath")
        .trim()
        .not()
        .isEmpty()
], scanController.getScan);

module.exports = router;
