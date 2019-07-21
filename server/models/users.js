const mongoose = require('mongoose');
const validate = require('mongoose-validator')

module.exports = function() {
    var emailValidator = [
        validate({
            validator: 'matches',
            arguments: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
            message: 'Email is invalid'
        })
    ]

    var userSchema = new mongoose.Schema({
        firstName: { type: String, trim: true, required: [true, 'First name cannot be blank']},
        lastName: { type: String, trim: true, required: [true, 'Last name cannot be blank']},
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, 'Email address is required'],
            validate: emailValidator
        },
        isEmailVerified: { type: Boolean, default: false },
        password: { 
            type: String, required: [true, "Password cannot be blank"], minlength: [8, "Password must contain at least 8 characters"]
        },
        userType: { type: Number, default: 1 },
        deletedAt: { type: Date, default: 0 }
    }, {timestamps: true });

    mongoose.model('User', userSchema);
}