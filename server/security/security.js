const bcrypt = require("bcryptjs");

const arbitraryString = 'arbitraryDateJanuary99';

module.exports = {
    generatePassword: (rawPassword, next) => {
        if (!rawPassword) {
            next ('Missing argument');
            return;
        }
        
        const salt = bcrypt.genSaltSync(10);
        if (!salt) {
            next('Unable to generate hash');
            return;
        }

        const hash = bcrypt.hashSync(rawPassword, salt);
        if (!hash) {
            next('Unable to generate hash');
            return;
        }
        
        next(null, hash);
    },

    verifyPassword: (clientPass, serverPass, next) => {
        if (!clientPass || !serverPass) {
            next ('Missing argument');
            return;
        }

        if (!bcrypt.compareSync(clientPass, serverPass)) {
            next('Password is invalid');
            return;
        }

        next(null, true);
    },

    generateToken: (user, next) => {
        if (!user) {
            next('Unable to generate token');
            return;
        }

        const formula = user.firstName + user.createdAt + arbitraryString + user.lastName;
        
        const salt = bcrypt.genSaltSync(10);
        if (!salt) {
            next('Unable to generate hash');
            return;
        }

        const token = bcrypt.hashSync(formula, salt);

        next(null, token);
    },

    verifyToken: (clientToken, user, next) => {
        if (!clientToken || !user) {
            next ('Missing argument');
            return;
        }

        const formula = user.firstName + user.createdAt + arbitraryString + user.lastName;
        
        if (!bcrypt.compareSync(formula, clientToken)) {
            next('Token is invalid');
            return;
        }

        next(null, true);
    },

    veriiftAdmin: (clientToken, userType, next) => {

    }
}