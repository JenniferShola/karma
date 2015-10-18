var mongoose = require('mongoose');
var config = require('config');

var cachedConnections = {};

function connect(db) {

    if (!cachedConnections[db]) {
        mongoose.set('debug', config.mongo.debug || false);
        cachedConnections[db] = mongoose.connect(config.get('mongo.uri') + db);
    }

    return cachedConnections[db];

}

module.exports = connect;

