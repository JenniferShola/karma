var express = require('express');
var router = express.Router();
var InteractionModel = require('./../models/interaction');

/* GET Interaction By Id. */
router.get('/:id', function(req, res) {
    InteractionModel
        .findOne({_id: req.params.id})
        .exec(function(err, doc) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.send(doc);
            }   
        }
    ); 
});

/* GET Interactions For All User Ids. */
router.get('/', function(req, res) {
    InteractionModel
        .find({})
        .exec(function(err, docs) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.send(docs);
            }
        }
    ); 
});

/* GET Interactions For User Id. */
router.get('/user/:id', function(req, res) {
    InteractionModel
        .find({_creator: req.params.id})
        .exec(function(err, doc) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.send(doc);

            }   
        }
    ); 
});

/* GET Interactions For User Id with User Detail. */
router.get('/user/:id/detailed', function(req, res) {
    InteractionModel
        .find({_creator: req.params.id})
        .populate('_creator', 'name photo contact_type')
        .exec(function(err, docs) {
            if( err ) { 
                res.send("There was a problem adding the information to the database.");
            } else {
                res.send(docs);
            }
        }
    ); 
});

/* PUT Interaction By Id. */
router.put('/:id', function(req, res) {
    InteractionModel.update({_id : req.params.id}, {
        name: req.headers['name'],
        photo: req.headers['photo'],
        source: req.headers['location'],
        description: req.headers['notes']
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
        _creator:           req.body.creator,
        title:              req.body.title,
        description:        req.body.description,
        action:             req.body.action,
        action_time:        req.body.action_time,
        location:           req.body.location,
        notes:              req.body.notes
    };

    var interaction = new InteractionModel(data);

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
router.delete('/:id', function(req, res) {
    if (req.body.safedelete == 'yes') {
        InteractionModel.remove({ _id: req.params.id }, function(err, doc) {
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
