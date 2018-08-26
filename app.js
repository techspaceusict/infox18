const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    configDB = require('./config/db'),
    Users = require('./models/user');
require('dotenv').load();

mongoose.connect(configDB.url || process.env.url, {useNewUrlParser: true})
    .then(function () {
        console.log("mongo connected!");
    })
    .catch(function (err) {
        console.log('err:' + err);
    });
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'infox123',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

function isLoggedIn(req, res, next){
    if(req.isAuthenticated() === true){
        return next();
    }
    res.redirect('/signIn');
}

app.get('/', function (req, res) {
    res.render("pages/home");
});

app.get('/signIn', function (req,res) {
    res.render("pages/signIn", {message: req.flash("signUpLogInMessage")});
});

app.post('/signUp', passport.authenticate('local-signUp', {
    successRedirect: '/',
    failureRedirect: '/signIn',
    failureFlash: true
}));

app.post('/signIn', passport.authenticate('local-signIn', {
    successRedirect: '/profile',
    failureRedirect: '/signIn',
    failureFlash: true
}));

// app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile',
        failureRedirect: '/signIn' }));

// app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

// app.get('/auth/google/callback',
//     passport.authenticate('google', { successRedirect: '/profile',
//         failureRedirect: '/signIn' }));

app.get('/profile', isLoggedIn, function (req, res) {
    console.log(req.user);
    res.render('pages/profile', {user: req.user});
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.get('/events', function (req, res) {
    res.render("pages/events");
});

app.get('/about', function (req, res) {
    res.render("pages/about");
});

app.get('/contact', function (req, res) {
    res.render("pages/contact");
});

app.get('/schedule', function (req, res) {
    res.render("pages/schedule");
});

app.get('/sponsers', function (req, res) {
    res.render("pages/sponsers");
});

app.listen(process.env.PORT || 8080, function(){
    console.log("server started!");
});