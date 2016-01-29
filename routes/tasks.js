var express = require('express');
var router = express.Router();
var TaskModel = require('./../models/task');

/* GET task By Id. */
router.get('/:id', function(req, res) {
    TaskModel
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

/* GET tasks For All User Ids. */
router.get('/', function(req, res) {
    TaskModel
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

/* GET Tasks For User Id. */
router.get('/user/:id', function(req, res) {
    TaskModel
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

/* GET Tasks For User Id with User Detail. */
router.get('/user/:id/detailed', function(req, res) {
    TaskModel
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

/* PUT Task By Id. */
router.put('/:id', function(req, res) {
    TaskModel.update({_id : req.params.id}, {
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

/* POST New Task. */
router.post('/', function(req, res) {

    var data = {
        _creator:           req.headers['creator'],
        _receiver:          req.headers['receiver'],
        title:              req.headers['title'],
        description:        req.headers['description'],
        action:             req.headers['action'],
        action_time:        req.headers['action_time'],
        location:           req.headers['location'],
        notes:              req.headers['notes']
    };

    var task = new TaskModel(data);

    task.save(function(err, doc) {
        if (err) {
            console.log('update not successful', err);
            res.send("There was a problem adding the information to the database.");
        } else {
            res.render('tasks', {
                "tasklist" : [doc]
            });
        }
    });
});

/* DELETE Task By Id. */
router.delete('/:id', function(req, res) {
    var safe_delete = req.headers['safedelete'];
    if (safe_delete == 'yes') {
        TaskModel.remove({ _id: req.params.id }, function(err, doc) {
            if( err ) {
                console.log('update not successful', err);
                res.send("There was a problem updating the information to the database.");
            } else {
                res.render('index', {
                    "title" : "Welcome to Karma!",
                    "body" : "Delete task Completed!"
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