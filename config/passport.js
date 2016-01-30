var JwtStrategy = require('passport-jwt').Strategy;
var Account = require('../models/account');
var config = require('./database');

module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Account.findOne({id: jwt_payload.id}, function(err, account) {
            if (err) {
                return done(err, false);
            }
            if (account) {
                done(null, account);
            } else {
                done(null, false);
            }
        });
    }));
};