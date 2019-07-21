module.exports = {
    validatePassword(password, next) {
        const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9].{7,}/;

        if (!password) {
            next('No password given');
            return;
        }
        if (!password.match(passwordRegex)) {
            next('Password must be 8 or more characters. Must have least one A-Z, one a-z, one 0-9');
            return;
        }
        if (password.length > 32) {
            next('Password cannot exceed 32 characters');
            return;
        }
        next(null, true);
    },

    validateEmail(email, next) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!email){
            next('No Email given');
            return;
        }
        if(!email.match(emailRegex)){
            next('Email is not valid');
            return;
        }
        next(null, true);
    },
}