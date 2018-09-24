const localStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require("../models/user"),
    configAuth = require('./auth');
require('dotenv').load();

module.exports = function (passport) {
    //
    // if(!configAuth){
    //         facebookAuthClientID = process.env.facebookAuthClientID;
    //         facebookAuthClientSecret = process.env.facebookAuthClientSecret;
    //         facebookAuthCallBackURL = process.env.facebookAuthCallBackURL;
    //         googleClientID = process.env.googleClientID;
    //         googleClientSecret = process.env.googleClientSecret;
    //         googleCallBackURL = process.env.googleCallBackURL;
    // }else{
    facebookAuthClientID = configAuth.facebookAuth.clientID;
    facebookAuthClientSecret = configAuth.facebookAuth.clientSecret;
    facebookAuthCallBackURL = configAuth.facebookAuth.callbackURL;
    googleClientID = configAuth.googleAuth.clientID;
    googleClientSecret = configAuth.googleAuth.clientSecret;
    googleCallBackURL = configAuth.googleAuth.callbackURL;
    // }

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signUp', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            process.nextTick(function () {
                User.findOne({'username': username}, function (err, user) {
                    if(err)
                        return done(err);
                    if(user){
                        return done(null, false, req.flash('signUpLogInMessage', "Email is already taken"));
                    }else{
                        let newUser = new User();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if(err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                })
            })
        })
    );

    passport.use('local-signIn', new localStrategy({
            usernameField: 'username1',
            passwordField: 'password1',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            process.nextTick(function () {
                User.findOne({'username': username}, function (err, user) {
                    if(err)
                        return done(err);
                    if(!user){
                        return done(null, false, req.flash('signUpLogInMessage', "NO user Found"));
                    }
                    if(!user.validPassword(password))
                        return done(null, false, req.flash('signUpLogInMessage', "Invalid Password"));
                    return done(null, user);
                });
            });
        }));

    console.log(facebookAuthClientID);

    passport.use(new FacebookStrategy({
            clientID: facebookAuthClientID,
            clientSecret: facebookAuthClientSecret,
            callbackURL: facebookAuthCallBackURL,
            profileFields: ['id', 'email', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("profile:" + JSON.stringify(profile));
            process.nextTick(function () {
            console.log("profile:" + JSON.stringify(profile));
            User.findOne({'facebook.id': profile.id}, function(err, user) {
                if (err) { return done(err); }
                if(user)
                   done(null, user);
                else{
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName,
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function (err) {
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                }
            });
        });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: googleCallBackURL,
            profileFields: ['id', 'email', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("profile:" + JSON.stringify(profile));
            process.nextTick(function () {
                console.log("profile:" + JSON.stringify(profile));
                User.findOne({'google.id': profile.id}, function(err, user) {
                    if (err) { return done(err); }
                    if(user)
                        done(null, user);
                    else{
                        var newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName,
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function (err) {
                            if(err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                });
            });
        }
    ));
};