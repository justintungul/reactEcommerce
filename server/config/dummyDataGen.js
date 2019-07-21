const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Auction = mongoose.model('Auction');

const users = require('./dummyData-users')
const cats = require('./dummyData-categories')
// const auctions = require('./dummyData-auctions')

module.exports = function(req, res) {
    User.insertMany(users, (err, manyUsers) => {
        if (err) {
            res.json({status: false, message: "Insert many users", data: err});
        } else {
            Category.insertMany(cats, (err, manyCategries) => {
                if (err) {
                    res.json({status: false, message: "Insert many categories", data: err})
                } else {
                    insertToAuctionsAndCategoyFromUser('johnd@email.com', 'collect');
                    insertToAuctionsAndCategoyFromUser('justin@email.com', 'cars')
                    res.json({status: true, message: "The One Header", data: "Ok"})
                }
            })
        }
    })

    function insertToAuctionsAndCategoyFromUser(email, categoryName) {
        User.findOne({email: email}, (err, user) => {
            Auction.insertMany(user['auctions_created'], (err, aucs) => {
                if (err) {
                    // res.json({status: false, message: "Insert many auctions", data: err});
                } else {
                    // res.json({status: true, message: "Insert many auctions", data: {docs: docs, docs2: docs2}})
                    insertToCategory(categoryName, user['auctions_created']);
                }
            })
        })
    }

    function insertToCategory(categoryName, aucs) {
        // res.json({status: true, message: "Insert many categories", data: {docs: docs, docs2: docs2, docs3: docs3}})
        Category.update({name: categoryName}, {$set: {auctions: aucs}}, (err, aucsInCategory) => {
            if (err) {
                // res.json({status: false, message: "Insert auctions to a category", data: err})
            } else {
                // res.json({status: true, message: "Insert auctions to a category", data: {docs: aucsInCategory}})
            }
        })
    }
}