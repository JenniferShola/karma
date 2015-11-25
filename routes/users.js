var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user');

/* GET User By Id. */
router.get('/:id', function(req, res) {
    UserModel.findOne({username: req.params.id}).exec(function(err, doc) {
        if( err ) {
            res.send("There was a problem adding the information to the database.");
        } else {
	    res.render('users', {
                "userlist" : [doc]
            }); 
        }
    });
});

/* GET All Users. */
router.get('/', function(req, res) {
    UserModel.find({}).exec(function(err, docs) {
        if( err ) {
            res.send("There was a problem adding the information to the database.");
        } else {
	    res.render('users', {
                "userlist" : docs
            }); 
        }
    });
});

/* PUT User By Id. */
router.put('/:id', function(req, res) {
    UserModel.update({username: req.params.id}, { 
        name: req.headers['name'],
        profession: req.headers['profession'],
        email: req.headers['email'],
    }, function(err, doc) {
        if( err ) {
            console.log('update not successful', err);
            res.send("There was a problem updating the information to the database.");
        } else {
	    res.render('index', {
                "title" : "Welcome to Karma!",
                "body" : "Put Completed!"
            }); 
        }
    });
});

/* POST New User. */
router.post('/', function(req, res) {
    
    var data = {
        name : 'temp name',
	username : req.headers['username'],
        profession: 'doctor',
        email: req.headers['email'],
        location: 'SF',
        contact_type: 'Gold'
    };

    var user = new UserModel(data);

    user.save(function(err, doc) {
        if (err) {
            console.log('update not successful', err);
            res.send("There was a problem adding the information to the database.");
        } else {
	    res.render('users', {
                "userlist" : [doc]
            }); 
        }
    });
});

/* DELETE User By Id. */
router.delete('/:id', function(req, res) {
    var safe_delete = req.headers['safedelete'];
    if (safe_delete == 'yes') {
        UserModel.remove({username: req.params.id}, function(err, doc) {
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
