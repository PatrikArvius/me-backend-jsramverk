const express = require('express');
const router = express.Router();
const reportsModel = require('../models/reportsModel');
const authentication = require('../models/authentication');


router.get('/week/:nr', function(req, res) {
    reportsModel.getSpecificReport(res, req.params.nr);
});

router.get('/', function(req, res) {
    reportsModel.getAllReports(res);
});

router.post("/",
    (req, res, next) => authentication.verifyToken(req, res, next),
    (req, res) => reportsModel.addReport(res, req.body)
);

router.put("/",
    (req, res, next) => authentication.verifyToken(req, res, next),
    (req, res) => reportsModel.editReport(res, req.body)
);

module.exports = router;
