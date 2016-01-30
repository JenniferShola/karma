var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user');

/* GET User By Username. */
router.get('/:username', function(req, res) {
    UserModel.findOne({username: req.params.username}).exec(function(err, doc) {
        if( err ) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.send(doc);
        }
    });
});

/* GET All Users. */
router.get('/', function(req, res) {
    UserModel.find({}).exec(function(err, docs) {
        if( err ) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.send(docs);
        }
    });
});

/* PUT User By Username. */
router.put('/:username', function(req, res) {
    if (!req.params.username || !req.body.name || !req.body.profession || !req.body.email
        || !req.body.location || !req.body.photo || !req.body.contact_type || !req.body.phone_number) {
        res.json(
            {
                success: false,
                msg: 'Please specify all required fields to update: name, profession and email.'
            }
        );
    } else {
        UserModel.update({username: req.params.username}, {
            name: req.body.name,
            profession: req.body.profession,
            email: req.body.email,
        }, function(err, doc) {
            if( err ) {
                console.log('update not successful', err);
                res.send("There was a problem updating the information to the database.");
            } else {
                res.send(doc);
            }
        });
    }
});

/* POST New User. */
router.post('/', function(req, res) {
    if (!req.body.name || !req.body.username || !req.body.profession || !req.body.email
        || !req.body.location || !req.body.photo || !req.body.contact_type || !req.body.phone_number) {
        res.json(
            {
                success: false,
                msg: 'Please specify all required fields: username and password.'
            }
        );
    } else {
        var data = {
            name: req.body.name,
            username: req.body.username,
            profession: req.body.profession,
            email: req.body.email,
            location: req.body.location,
            photo: req.body.photo,
            contact_type: req.body.contact_type,
            phone_number: req.body.phone_number
        };

        var user = new UserModel(data);

        user.save(function (err, doc) {
            if (err) {
                console.log('update not successful', err);
                res.send("There was a problem adding the information to the database.");
            } else {
                res.render('users', {
                    "userlist": [doc]
                });
            }
        });
    }
});

/* DELETE User By Username. */
router.delete('/:username', function(req, res) {
    if (req.body.safedelete == 'yes') {
        UserModel.remove({username: req.params.username}, function(err, doc) {
            if( err ) {
                console.log('update not successful', err);
                res.send("There was a problem updating the information to the database.");
            } else {
	            res.render('index', {
                    "title" : "Welcome to Karma!",
                    "body" : "Delete User Completed!"
                }); 
            }
        });
    } else {
	    res.render('index', {
            "title" : "Welcome to Karma!",
            "body" : "Safe Delete Not On. Delete Not Completed!"
        }); 
       
    }
});

module.exports = router;
