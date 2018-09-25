const Events = require("../models/events");

module.exports = function (router) {
    router.use(function (req, res, next) {
        if(req.isAuthenticated() === true){
            return next();
        }else{
            res.redirect("/signIn");
        }
    });

    router.get("/profile", function (req, res) {
        res.render("user/profile", {user: req.user});
    });

    router.get("/dashboard", function (req, res) {
        console.log(req.user.events);
        Events.find({
            '_id': {
                 $in: req.user.events
            }
        }, function (err, output) {
            if(err)
                console.log(err);
            else {
                console.log(output);
                res.render("user/dashboard", {events: output});
            }
        });
    });
};