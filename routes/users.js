var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user');
var client = require('./../models/es-client');
// var elasticsearch = require('elasticsearch');

/* GET User By Id. */
router.get('/:id', function(req, res) {
    UserModel.findOne({username: req.params.id}).exec(function(err, doc) {
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

    // add new user to db
    var data = {
        name : req.headers['name'],
	    username : req.headers['username'],
        profession: req.headers['profession'],
        email: req.headers['email'],
        location: req.headers['location'],
        photo: req.headers['photo'],
        contact_type: req.headers['contact_type'],
        phone_number: req.headers['phone_number']
    };

    var user = new UserModel(data);
    var userAsJSON = JSON.stringify(data);
    var successful = null;
    var error_msg = "";

    user.save(function(err, doc) {
        if (err) {
            console.log('User update not successful in db.', err);
            res.send("There was a problem adding the information to the database.");
        } else {
g            successful = doc
        }
    });

    // add new user to search index
    client().index({
      index: 'blog',
      type: 'post',
      id: user.username,
      body: userAsJSON
    }, function (err, resp) {
        if (err) {
            console.log('User update to search index was not successful', err);
            resp.send("There was a problem adding the information to the search index.");
        } else {
            console.log("This is the successful response I get from the search Index: ", resp);
        }
    });

    if(successful != null) {
        res.render('users', {
            "userlist" : [successful]
        });  
    } else {
        res.send("There is some unknown problem that returned a null object to us.");
    }

});

/* DELETE User By Id. */
router.delete('/:id', function(req, res) {
    var safe_delete = req.headers['safedelete'];
    if (safe_delete == 'yes') {

        // remove user from db
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

        // remove user from search index
        client().delete({
          index: 'blog',
          type: 'post',
          id: req.params.id,
          ignore: [404]
        }).then(function (body) {
          // since we told the client to ignore 404 errors, the
          // promise is resolved even if the index does not exist
          console.log('index was deleted or never existed');
        }, function (error) {
          // oh no!
          console.log('there was an error - index was not deleted');
        });


    } else {
	    res.render('index', {
            "title" : "Welcome to Karma!",
            "body" : "Safe Delete Not On. Delete Not Completed!"
        }); 
       
    }
});

module.exports = router;
