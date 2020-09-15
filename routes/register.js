const express = require('express');
const router = express.Router();
const registerModel = require('../models/registerModel');

router.post("/", (req, res) => registerModel.registerUser(res, req.body));

module.exports = router;
