const mongoose = require("mongoose");
const User = mongoose.model("User");

const HttpResponses = require('../http_responses/http_responses');
const Security = require('../security/security');
const Validations = require('../validations/validations');

const _verifyToken = (id, token, next) => {
    User.findOne({_id: id}, (err, user) => {
        if (err) {
            next('Database error', err);
            return;
        }

        if (!user || !id === user._id) {
            next('User does not exist');
            return;
        }

        Security.verifyToken(token, user, (err, isValid) => {
            if (!isValid) {
                next('Invalid token', err);
                return;
            }
            next(null, user);
        });
    });
}

module.exports = {
    getUserById: (req, res) => {
        _verifyToken(req.body.id, req.body.token, (err, data) => {
            if (err) {
                HttpResponses.unauthorized(res, err);
                return;
            }
            HttpResponses.successBasicInfo(res, data);
        })
    },

    updateUserById: (req, res) => {
        _verifyToken(req.body.id, req.body.token, (err, data) => {
            if (err) {
                HttpResponses.unauthorized(res, err);
                return;
            }

            // update data with post info
            for (key in req.body) {
                data[key] = req.body[key];
            }

            data.save({validateBeforeSave: true}, (err) => {
                if (err) {
                    HttpResponses.error(res, 'Database error', err);
                    return;
                }
                HttpResponses.successBasicInfo(res, data);
            })
        })
    },
    
    registerUser: (req, res) => {
    // cross site request forgery vulnerable

        Validations.validatePassword(req.body.password, (err, isValid) => {
            if (!isValid) {
                HttpResponses.error(res, 'Validation error', err);
                return;
            }
            
            Security.generatePassword(req.body.password, (err, hash) => {
                if (err) {
                    HttpResponses.error(res, 'Encryption error', err);
                    return;
                }
                
                // replace password with hash
                req.body.password = hash;
                
                User.create(req.body, (err, user) => {
                    if (err) {
                        HttpResponses.error(res, 'Database error', err);
                        return;
                    }

                    HttpResponses.successLoginInfo(res, user);
                });
            });
        });
    },

    loginUser: (req, res) => {
    // cross site request forgery vulnerable
    
        Validations.validateEmail(req.body.email, (err, isValid) => {
            if (!isValid) {
                HttpResponses.error(res, 'Validation error', err);
                return;
            }

            User.findOne({email: req.body.email}, (err, user) => {
                if (err) {
                    HttpResponses.error(res, 'Database error', err);
                    return;
                }
                if (!user) {
                    HttpResponses.error(res, 'Unable to login', 'User does not exist');
                    return;
                }

                Security.verifyPassword(req.body.password, user.password, (err, isValid) => {
                    if (!isValid) {
                        HttpResponses.error(res, 'Unable to login', err);
                        return;
                    }

                    Security.generateToken(user, (err, token) => {
                        if (err) {
                            HttpResponses.error(res, 'Unable to login', err);
                            return;
                        }

                        user.token = token;
                        HttpResponses.successLoginInfo(res, user);
                    });
                });
            });
        });
    }
};