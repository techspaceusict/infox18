const Events = require("../models/events");

module.exports = function (router, passport) {

    router.use(function (req, res, next) {
        // check if it is a admin
        if(req.user){
            if(req.user.type) {
                return next();
            }
            res.redirect("/");
        }
        res.redirect("/signIn");
    });
    
    router.get('/events/new', function (req, res) {
        res.render('admin/addNewEvent');
    });

    router.post('/events', function (req, res) {
        console.log("adding new event!");
        console.log(req.body);
        Events.create({
            name: req.body.name,
            type: req.body.type,
            date: req.body.date,
            venue: req.body.venue,
            time: req.body.time,
            fbUrl: req.body.fbUrl,
            description: req.body.description,
            organisersName: [req.body.name1,req.body.name2,req.body.name3],
            organisersEmail: [req.body.email1,req.body.email2,req.body.email3],
            organisersMobile: [req.body.mobile1,req.body.mobile2,req.body.mobile3]
        }, function (err, event) {
            if(err)
                console.log(err);
            else {
                console.log("event created: ", JSON.stringify(event));
                res.redirect("/admin/events");
            }
        });
    });

    router.get('/events', function (req, res) {
        res.send("all events");
    });

    router.get('/events/:id', function (req, res) {
        res.send("view event");
    });

    router.get('/events/:id/edit', function (req, res) {
        res.send("edit event");
    });

    router.put('/events/:id', function (req, res) {

    });
    
    router.delete('events/:id', function (req, res) {
        
    })

};