var express = require('express');
var router = express.Router();
var ConnectionsModel = require('./../models/connection');

/* GET Connection By Id. */
router.get('/:id', function(req, res) {
    ConnectionsModel.findOne({_id: req.params.id}).exec(function(err, doc) {
        if( err ) { 
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('connections', {
                "connectionlist" : [doc]
            }); 
        }   
    }); 
});

/* GET Connections For User Id or All User Ids. */
router.get('/', function(req, res) {
    if (req.headers['id']) {
        ConnectionsModel.findOne({to_user_id: req.headers['id']}).exec(function(err, doc) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.render('connections', {
                    "connectionlist" : [doc]
                }); 
            }   
        });
    } else {
        ConnectionsModel.find({}).exec(function(err, docs) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.render('connections', {
                    "connectionlist" : docs
                }); 
            }
        });
    }
});

/* GET All Connectionss. */
router.get('/', function(req, res) {
    ConnectionsModel.find({}).exec(function(err, docs) {
        if( err ) { 
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('connections', {
                "connectionlist" : docs
            }); 
        }   
    }); 
});

/* PUT Connection By Id. */
router.put('/id/:id', function(req, res) {
    ConnectionsModel.update({_id: req.params.id}, {
        name: req.body.name,
        profession: req.body.profession,
        email: req.body.email,
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

/* POST New Connection. */
router.post('/', function(req, res) {
    
    var data = {
        to_user_id: '5623b3cc953404ca344bef3b',
        name : 'connection name',
        contact_type: 'Gold'
    };

    var connection = new ConnectionModel(data);

    connection.save(function(err, doc) {
        if (err) {
            console.log('update not successful', err);
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('connections', {
                "connectionlist" : [doc]
            });
        }
    });
});

/* DELETE Connection By Id. */
router.delete('/id', function(req, res) {
    var safe_delete = req.headers['safedelete'];
    if (safe_delete == 'yes') {
        ConnectionModel.remove({ _id: req.headers['id']}, function(err, doc) {
            if( err ) {
                console.log('update not successful', err);
                res.send("There was a problem updating the information to the database.");
            } else {
                res.render('index', {
                    "title" : "Welcome to Karma!",
                    "body" : "Delete Connection Completed!"
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
