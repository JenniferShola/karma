var express = require('express');
var router = express.Router();
var InteractionsModel = require('./../models/interaction');

/* GET Interaction By Id. */
router.get('/id', function(req, res) {
    InteractionsModel.findOne({_id: req.headers['id']}).exec(function(err, doc) {
        if( err ) { 
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('interactions', {
                "interactionlist" : [doc]
            }); 
        }   
    }); 
});

/* GET Interactions For User Id or All User Ids. */
router.get('/', function(req, res) {
    if (req.headers['id']) {
        InteractionsModel.findOne({to_user_id: req.headers['id']}).exec(function(err, doc) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.render('interactions', {
                    "interactionlist" : [doc]
                }); 
            }   
        }); 
    } else {
        InteractionsModel.find({}).exec(function(err, docs) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.send(docs);
            }
        }); 
    }
});

/* PUT Interaction By Id. */
router.put('/id', function(req, res) {
    InteractionsModel.update({_id : req.headers['id']}, {
        name: req.headers['name'],
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

/* POST New Interaction. */
router.post('/', function(req, res) {

    var data = {
        to_user_id:         req.headers['to_user_id'],
        connection_id:      req.headers['connection_id'],
        title:              req.headers['title'],
        description:        req.headers['description'],
        action:             req.headers['action'],
        action_time:        req.headers['action_time'],
        location:           req.headers['location'],
        tags:               req.headers['tags'],
        notes:              req.headers['notes']
    };

    var interaction = new InteractionsModel(data);

    interaction.save(function(err, doc) {
        if (err) {
            console.log('update not successful', err);
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('interactions', {
                "interactionlist" : [doc]
            });
        }
    });
});

/* DELETE Interaction By Id. */
router.delete('/id', function(req, res) {
    var safe_delete = req.headers['safedelete'];
    if (safe_delete == 'yes') {
        InteractionsModel.remove({ _id: req.headers['id'] }, function(err, doc) {
            if( err ) {
                console.log('update not successful', err);
                res.send("There was a problem updating the information to the database.");
            } else {
                res.render('index', {
                    "title" : "Welcome to Karma!",
                    "body" : "Delete Interaction Completed!"
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
