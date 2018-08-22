const localStrategy = require("passport-local").Strategy,
    User = require("../models/user");

module.exports = function (passport) {
    
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
};