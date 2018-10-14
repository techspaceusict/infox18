const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    morgan = require("morgan"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    configDB = require("./config/db"),
    override = require("method-override"),
    Users = require("./models/user"),
    mail = require("./mailer/mail");

require("dotenv").load();
const Events = require("./models/events");

mongoose
  .connect(
    configDB.url || process.env.url,
    { useNewUrlParser: true }
  )
  .then(function() {
    console.log("mongo connected!");
  })
  .catch(function(err) {
    console.log("err:" + err);
  });
require("./config/passport")(passport);

app.use(override("_method"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "infox123",
    saveUninitialized: true,
    resave: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  if (req.user) {
    console.log("logged in!");
    res.locals = {
      loggedIn: req.user
    };
  } else {
    res.locals.loggedIn = "";
    console.log("not logged in! ");
  }
  next();
});

app.get("/", function(req, res) {
  res.render("pages/hero");
});

app.get("/signIn", function(req, res) {
  res.render("pages/signIn", { message: req.flash("signUpLogInMessage") });
});

app.post(
  "/signUp",
  passport.authenticate("local-signUp", {
    successRedirect: "/",
    failureRedirect: "/signIn",
    failureFlash: true
  })
);

app.post(
  "/signIn",
  passport.authenticate("local-signIn", {
    successRedirect: "/user/profile",
    failureRedirect: "/signIn",
    failureFlash: true
  })
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/user/profile",
    failureRedirect: "/signIn"
  })
);

app.get("/auth/google", passport.authenticate("google", { scope: ["email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/user/profile",
    failureRedirect: "/signIn"
  })
);


app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/events", function(req, res) {
    Events.find({}, function (err, output) {
        if(err){
            console.log("Error: " + JSON.stringify(err));
        }else {
            // console.log(output);
            res.render("pages/events", {events: output});
        }
    });
});

app.post("/register/:eventId", function (req, res) {
    console.log(req.user);
    Events.findByIdAndUpdate(req.params.eventId, {
        $push: { users: req.user.id }
    }, function (err, output) {
        if(err)
            console.log(err);
        else{
            console.log("user registered in event!");
            console.log(output);
            Users.findByIdAndUpdate(req.user.id, {
                $push: { events: req.params.eventId }
            }, function (err, output) {
                if(err)
                    console.log(err);
                else{
                    console.log("user registered in event!");
                    console.log(output);
                    res.redirect("/events");
                }
            });
        }
    });
});

app.get("/about", function(req, res) {
  res.render("pages/about");
});

app.get("/contact", function(req, res) {
  res.render("pages/contact");
});

app.get("/schedule", function(req, res) {
  res.render("pages/schedule");
});

app.get("/sponsors", function(req, res) {
  res.render("pages/sponsors");
});

app.get("/team", function(req, res) {
  res.render("pages/team");
});

app.get("/comingsoon", function(req, res) {
  res.render("pages/comingsoon");
});

app.get("/contact/:name/:id/:msg", function (req, res) {
   mail.sendMail({
        from: "Infoxpression Website Enquiries <helpinfoxpression@gmail.com>",
        to: "infox@ipu.ac.in",
        subject: 'Enquiry Message',
        text: "Sender's Name: " + req.params.name + "\nSenders's Email: " + req.params.id + "\n\nEnquiry/Message: " + req.params.msg
   }, function (err, sent) {
       if(err) {
           console.log(err);
           res.setHeader('Content-Type', 'application/json');
           res.send(200, JSON.stringify({"result": false}));
       }
       else{
           console.log("mail sent to infox@ipu.ac.in");
           res.setHeader('Content-Type', 'application/json');
           res.send(200, JSON.stringify({"result": true}));
       }
   });
});

var admin = express.Router();
require("./routes/admin")(admin, passport);
app.use("/admin", admin);

var user = express.Router();
require("./routes/user")(user);
app.use("/user", user);

app.get("*", function (req, res) {
   res.render("pages/404");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000!");
});
