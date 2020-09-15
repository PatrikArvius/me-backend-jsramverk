const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let config;

try {
    config = require("../config/config.json");
} catch(error) {
    console.error(error);
}

const secret = process.env.JWT_SECRET || config.secret;

const authentication = {
    verifyToken: function(req, res, next) {
        const token = req.headers['x-access-token'];

        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    title: "Failed authentication",
                    detail: err.message
                });
            }

            next();
        });
    },

    /** 
     * Function providing a jwt token
     * @param res the response object
     * @param password entered password from login form
     * @param user db row result object from db query
     * @returns res.json
    */
    getToken: function(res, password, user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        title: "Bcrypt error",
                        source: "/login",
                        detail: err.message,
                    }
                });
            } else if (result) {
                const payload = { email: user.email };
                const token = jwt.sign(payload, secret, { expiresIn: '1h'});

                return res.status(200).json({
                    status: 200,
                    title: "Logged in",
                    detail: `${user.email} logged in and received token`,
                    token: token,
                });
            }

            return res.status(401).json({
                error: {
                    status: 401,
                    title: "Login failed",
                    source: "/login",
                    detail: "The provided password was incorrect",
                }
            });
        });
    },
};

module.exports = authentication;
