const users = require('../controllers/users');
const admins = require('../controllers/admins');
// const dumdum = require('../config/dummyDataGen')

const path = require('path')

module.exports = function(app) {

    // USER ROUTES
    app.post('/api/users', (req, res) => {
        users.getAllUsers(req, res)
    })
    app.post('/api/user', (req, res) => {
        users.getUserById(req, res)
    })
    app.post('/api/user/register', (req, res) => {
        users.registerUser(req, res)
    })
    app.put('/api/user/update', (req, res) => {
        users.updateUserById(req, res)
    })
    app.post('/api/login', (req, res) => {
        users.loginUser(req, res)
    })

    // ADMIN ROUTES
    app.post('/api/admin/user', (req, res) => {
        admins.getUserById(req, res)
    }),
    app.delete('/api/admin/user/delete', (req, res) => {
        admins.nukeUserById(req, res)
    }),

    // MISC
    app.post('/api/createCategories', (req, res) => {
        categories.defaultCategories(req, res)
    })
    app.get('/dumdum', (req, res) => {
        dumdum(req, res)
    })

    app.all("*", (req, res, next) => {
        // console.log(__dirname + "../../../frontend/public/index.html")
        console.log('No Route')
        res.sendFile(path.resolve(__dirname + "../../../frontend/public/index.html"))
    });
}