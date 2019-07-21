const settings = require('../config/settings');

const loginInfo = (data) => {
    return {
        firstName: data.firstName,
        email: data.email,
        token: data.token
    }
}

const BasicInfo = (data) => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        createdAt: data.createdAt,
        userType: data.userType,
    }
}

const DEVELOPMENT = settings.DEVELOPMENT;

module.exports = {
    error: (res, message, data) => {
        if (DEVELOPMENT) {
            res.json({ status: false, message: message, data: data });
        } else {
            res.json({ status: false, data: message });
        }
    },
    
    unauthorized: (res, data) => {
        if (DEVELOPMENT) {
            res.json({ status: false, message: 'Unauthorized request', data: data });
        } else {
            res.json({ status: false, data: 'Unauthorized request' });
        }
    },

    success: (res, data) => {
        res.json({ status: true, data: data });
    },

    successLoginInfo: (res, data) => {
        res.json({status: true, data: loginInfo(data) });
    },

    successBasicInfo: (res, data) => {
        res.json({status: true, data: BasicInfo(data) });
    }
}
