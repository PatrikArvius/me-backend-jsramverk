const express = require('express');
const router = express.Router();
const loginModel = require('../models/loginModel');

router.post("/", (req, res) => loginModel.logInUser(res, req.body));

module.exports = router;
