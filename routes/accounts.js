var express = require('express');
var router = express.Router();
var AcctModel = require('./../models/account');
//var passport = require('../config/passport');
var passport = require('../config/init_passport');
require('../config/passport')(passport);
var config = require('../config/database');
var jwt = require('jwt-simple');

router.post('/authenticate', function(req, res) {
    AcctModel.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.send({success: true, token: token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
router.get('/mem', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        AcctModel.findOne({
            username: decoded.username
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

/* GET Account By Id. */
router.get('/:id', function(req, res) {
    AcctModel.findOne({username: req.params.id}).exec(function(err, doc) {
        if( err ) { 
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('accounts', {
                "acctlist" : [doc]
            }); 
        }   
    }); 
});

/* GET All Accounts. */
router.get('/', function(req, res) {
    AcctModel.find({}).exec(function(err, docs) {
        if( err ) { 
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('accounts', {
                "acctlist" : docs
            }); 
        }   
    }); 
});

/* PUT Account By Id. */
router.put('/:id', function(req, res) {
    AcctModel.update({username: req.params.id}, { 
       password: req.headers['password']
    }, function(err, doc) {
        if( err ) { 
            console.log('update not successful', err);
            res.send("There was a problem updating the information to the database.");
        } else {
            res.render('index', {
                "title" : "Welcome to Karma!",
                "body" : "Password Updated!"
            }); 
        }   
    }); 
});


router.post('/', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please specify all required fields: username and password.'});
    } else {

        var data = {
            username : req.body.username,
            password : req.body.password
        };

        var account = new AcctModel(data);

        // save the user
        account.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'An unknown error has occurred.'});
            } else {
                res.json({success: true, msg: 'Successful created new user.'});
            }
        });
    }
});

/* DELETE Account By Id. */
router.delete('/:id', function(req, res) {
    var safe_delete = req.headers['safedelete'];
    if (safe_delete == 'yes') {
        AcctModel.remove({username: req.params.id}, function(err, doc) {
            if( err ) {
                console.log('update not successful', err);
                res.send("There was a problem updating the information to the database.");
            } else {
                res.render('index', {
                    "title" : "Welcome to Karma!",
                    "body" : "Delete Account Completed!"
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




getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
