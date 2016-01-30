var mongoose = require('mongoose');
var config = require('config')
var db = require('./cached');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var properties = { 
	_creator:           { type: String, ref: 'users', required: false, unique: false},
    username:           {type: String, required: true, unique: true},
    password:           {type: String, required: true, unique: false},
    signup:             {type: Number, required: false, default: Date.now},
    last_signin:        {type: Number, required: false, default: Date.now}
};

var definition = new Schema(properties);

definition.pre('save', function (next) {
    var account = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(account.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                account.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

definition.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var table = config.get('mongo.dbtable');

var model = db(table).model('accounts', definition);

module.exports = model;
