const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

const HttpResponses = require('../http_responses/http_responses');
const Security = require('../security/security');
const Validations = require('../validations/validations');

const _verifyAdmin = (id, token, next) => {
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

            if (user.userType === 99 || user.userType === 9) {
                next(null, user);
                return;
            }

            next('Unauthorized user');
        });

    });
}

module.exports = {
    getAllUsers: (req, res) => {
    },
    
    getUserById: (req, res) => {
    },
    
    createUser: (req, res) => {
    },

    updateUserById: (req, res) => {
        _verifyAdmin(req.body.id, req.body.token, (err, data) => {
            if (err) {
                HttpResponses.unauthorized(res, err);
                return;
            }

            // const options = {
            //     runValidators: true,
            //     new: true
            // }

            // User.findOneAndUpdate({_id: req.body.id}, req.body, options, (err, user) => {
            //     if (err) {
            //         HttpResponses.error(res, 'Database error', err);
            //         return;
            //     }
            //     if (!user) {
            //         HttpResponses.error(res, 'User does not exist');
            //         return;
            //     }
            //     HttpResponses.successLoginInfo(res, user);
            // });
        })
    },

    nukeUserById: (req, res) => {
        User.findOneAndDelete({_id: req.body.id}, (err, user) => {
            if (err) {
                HttpResponses.error(res, 'Database error', err);
                return;
            }
            if (!user) {
                HttpResponses.error(res, 'User does not exist');
                return;
            }
            HttpResponses.successLoginInfo(res, user);
        });
    },
};