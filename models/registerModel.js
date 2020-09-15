const db = require('../db/database.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const registerModel = {
    registerUser: async function(res, body) {
        const email = body.email;
        const password = body.password;

        if (!(email && password)) {
            return res.status(400).json({
                error: {
                    status: 400,
                    title: "Registration error",
                    source: "/register",
                    detail: "email or password is missing"
                }
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO users VALUES (?, ?)';

        db.run(sql, email, hashedPassword, err => {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        title: "Database error",
                        source: "/register",
                        detail: err.message
                    }
                });
            }

            res.status(201).json({
                msg: `User: ${email} was successfully registered`,
            });
        });
    },
};

module.exports = registerModel;
