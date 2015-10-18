var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Login page. */
router.get('/login', function(req, res) {
    var db = req.db;
    var collection = db.get('logincollection');
    collection.find({},{},function(e,docs){
        res.render('login', {
            "loginlist" : docs
        });
    });
});

module.exports = router;
