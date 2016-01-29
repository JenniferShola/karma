var mongoose = require('mongoose');
var config = require('config');
var db = require('./cached');

var Schema = mongoose.Schema;
var Types = Schema.Types;

var properties = { 
    _creator:           {type: String, ref: 'users', required: true, unique: false},
    receiver:           {type: String, ref: 'users', required: true, unique: false},
    title:              {type: String, required: true, unique: false},
    action:             {type: Number, required: true, unique: false}, 
    action_time:        {type: Number, required: false, unique: false},
    created_time:       {type: Number, required: false, default: Date.now},
    location:           {type: String, required: false, unique: false},
    notes:           	{type: String, required: false, unique: false}
};

var definition = new Schema(properties);
var table = config.get('mongo.dbtable');

var model = db(table).model('Task', definition);

module.exports = model;
