var express = require('express');
var app = express();
var itemRoutes = express.Router();

// Require Item model in our routes module
var Item = require('../models/Item');

//Require User model in our routes module
var User = require('../models/User');


// Defined get data(index or listing) route
itemRoutes.route('/').get(function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});



//Route for logging in
itemRoutes.post('/displayMenuItems', function(req, res, next) {
    User.authenticate(req.body.logemail, req.body.password, function(err, user) {
        if (err)
            return null;
        req.session.userId = 'ashik';
        req.session.authenticated = true;
        res.redirect('http://localhost:3000/displayMenuItems');
    });
});


itemRoutes.post('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return err;
            } else {
                res.redirect('http://localhost:3000/login');
            }
        });
    }
});



// Defined edit route
itemRoutes.route('/edit/:id/').get(function(req, res) {

    var id = req.params.id;

    Item.findById(id, function(err, item) {
        res.json(item);
    });
});


//  Defined update route
itemRoutes.route('/update/:id/:size/:price').post(function(req, res) {

    Item.findById(req.params.id, function(err, item) {

        if (!item) {
            return next(new Error('Could not load Document'));
        } else {

            // console.log("item", item);
            // console.log("req.params", req.params);
            // console.log("req.body", req.body);

            item.name = req.body.name;

            // console.log("req.body.options[0].price", req.body.options[0].price);
            // console.log("item.options[0].price", item.options[0].price);

            for (var i = 0; i < item.options.length; i++) {
                // console.log("Entered loop");
                if (item.options[i].size == req.params.size) {

                    item.options[i].price = req.body.options[0].price;
                    // console.log("After loop");
                }
            }

            // console.log("The item is", item);

            item.save().then(item => {
                    res.json('Update complete');
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});


module.exports = itemRoutes;