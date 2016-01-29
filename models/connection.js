var mongoose = require('mongoose');
var config = require('config');
var db = require('./cached');

var Schema = mongoose.Schema;
var Types = Schema.Types;

var properties = { 
    _creator:           { type: String, ref: 'users', required: true, unique: false},
    receivers:          [{ type: String, ref: 'users', required: true, unique: false}],
    name:               {type: String, required: true, unique: false},
    profession:         {type: String, required: false, unique: false},
    email:              {type: String, required: false, unique: false},
    location:           {type: String, required: false, unique: false},
    contact_type:       {type: String, required: true, unique: false},
    met_time:           {type: Number, required: false, default: Date.now},
    last_contact:       {type: Number, required: false, default: Date.now},
    contact_method:     {type: Number, required: true, default: 1},
    contact_lag:        {type: Number, required: true, default: 90},
    phone_number:       {type: Number, required: false, unique: false}
};

var definition = new Schema(properties);
var table = config.get('mongo.dbtable');

var model = db(table).model('connections', definition);

module.exports = model;
