var mongoose = require('mongoose');
var config = require('config');
var db = require('./cached');

var Schema = mongoose.Schema;
var Types = Schema.Types;

var properties = { 
    to_user_id:         {type: Number, required: true, unique: true},
    connection_id:      {type: Number, required: true, unique: true},
    title:              {type: String, required: true, unique: false},
    description:        {type: String, required: true, unique: false},
    content:            {type: String, required: false, unique: false},
    action:             {type: Number, required: true, unique: false}, 
    created_time:       {type: Number, required: false, default: Date.now},
    action_time:        {type: Number, required: false, unique: false},
    location:           {type: String, required: false, unique: false}
};

var definition = new Schema(properties);
var table = config.get('mongo.dbtable');

var model = db(table).model('interactions', definition);

module.exports = model;
