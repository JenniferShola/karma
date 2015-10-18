var express = require('express');
var router = express.Router();
var AcctModel = require('./../models/account');

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

/* POST New Account. */
router.post('/', function(req, res) {
    
    var data = { 
        username : req.headers['username'],
        password : req.headers['password']
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

module.exports = router;
