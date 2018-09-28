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
  Users = require("./models/user");

require("dotenv").load();

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

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated() === true) {
//     return next();
//   }
//   res.redirect("/signIn");
// }

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

// app.get("/profile", isLoggedIn, function(req, res) {
//   console.log(req.user);
//   res.render("pages/profile", { user: req.user });
// });

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/events", function(req, res) {
  res.render("pages/events");
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
