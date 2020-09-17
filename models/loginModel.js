const db = require('../db/database.js');
const authentication = require('./authentication');

const loginModel = {
    logInUser: function(res, body) {
        const email = body.email;
        const password = body.password;
        const sql = 'SELECT * FROM users WHERE email = ?';

        if (!(email && password)) {
            return res.status(401).json({
                error: {
                    status: 500,
                    title: "Login error",
                    source: "/login",
                    detail: "email or password is missing"
                }
            });
        }

        db.get(sql, email, (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        title: "Database error",
                        source: "/login",
                        detail: err.message
                    }
                });
            } else if (!row) {
                return res.status(401).json({
                    error: {
                        status: 401,
                        title: "No user",
                        source: "/login",
                        detail: "User with provided email does not exist"
                    }
                });
            }

            authentication.getToken(res, password, row);
        });
    },
};

module.exports = loginModel;
