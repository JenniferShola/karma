var mongoose = require('mongoose');
var config = require('config');
var db = require('./cached');

var Schema = mongoose.Schema;
var Types = Schema.Types;

var properties = {
    name:		{type: String, required: true, unique: false},
    username:		{type: String, required: true, unique: true},
    profession:		{type: String, required: false, unique: false},
    email:		{type: String, required: false, unique: false},
    location:		{type: String, required: false, unique: false},
    contact_type:	{type: String, required: true, unique: false},
    signup:		{type: Number, required: false, default: Date.now},
    last_signin:	{type: Number, required: false, default: Date.now},
    phone_number:	{type: Number, required: false, unique: false}
};

var definition = new Schema(properties);
var table = config.get('mongo.dbtable');

var model = db(table).model('users', definition);

module.exports = model;
