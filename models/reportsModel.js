const db = require('../db/database.js');

const reportsModel = {
    getAllReports: function(res) {
        const sql = 'SELECT * FROM reports;';

        db.all(sql, (err, row) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    title: "Database error",
                    detail: err.message
                });
            }

            res.status(200).json( { data: row} );
        });
    },

    getSpecificReport: function(res, num) {
        const sql = 'SELECT * FROM reports WHERE week = ?;';

        db.each(sql, num, (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            res.status(200).json( { data: row} );
        });
    },

    addReport: function(res, data) {
        const week = data.week;
        const text = data.text;
        const sql = 'INSERT INTO reports VALUES (?, ?);';

        db.run(sql, week, text, err => {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            res.status(201).json({
                msg: "Report successfully added",
                data: data
            });
        });
    },

    editReport: function(res, data) {
        const week = parseInt(data.week);
        const text = data.text;
        const sql = 'UPDATE reports SET report_text = ? WHERE week = ?;';

        db.run(sql, text, week, err => {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            res.status(201).json({
                msg: "Report successfully edited",
                data: data
            });
        });
    }
};

module.exports = reportsModel;
