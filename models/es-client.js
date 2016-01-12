var elasticsearch = require('elasticsearch');

var cachedESClient = null;

function establish_connection() {
    if (cachedESClient == null) {
    	cachedESClient = new elasticsearch.Client({
		  host: 'localhost:9200',
		  log: 'trace'
		});
	}
    return cachedESClient;
}

module.exports = establish_connection;