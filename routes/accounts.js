var express = require('express');
var router = express.Router();
var AcctModel = require('./../models/account');

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
                    // return the information including token as JSON
                    res.send({success: true});
                    //res.send({success: true, token: token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

/* GET Account By Id. */
router.get('/:username', function(req, res) {
    AcctModel.findOne({username: req.params.username}).exec(function(err, doc) {
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
router.put('/:username', function(req, res) {
    AcctModel.update({username: req.params.username}, {
       password: req.body.password
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

/* POST New Account. */
router.post('/', function(req, res) {
    
    var data = { 
        username : req.body.username,
        password : req.body.password
    };

    var account = new AcctModel(data);

    account.save(function(err, doc) {
        if (err) {
            console.log('update not successful', err);
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('index', {
                "title" : "Welcome to Karma!",
                "body" : doc
            });
        }
    });
});

/* DELETE Account By Id. */
router.delete('/:username', function(req, res) {
    if (req.body.safedelete == 'yes') {
        AcctModel.remove({username: req.params.username}, function(err, doc) {
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

module.exports = router;
