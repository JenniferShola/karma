var mongoose = require('mongoose');
var config = require('config')
var db = require('./cached');

var Schema = mongoose.Schema;
var Types = Schema.Types;

var properties = { 
	_creator:           { type: String, ref: 'users', required: true, unique: false},
    username:           {type: String, required: true, unique: true},
    password:           {type: String, required: true, unique: false},
    signup:             {type: Number, required: false, default: Date.now},
    last_signin:        {type: Number, required: false, default: Date.now}
};

var definition = new Schema(properties);
var table = config.get('mongo.dbtable');

var model = db(table).model('accounts', definition);

module.exports = model;
