const Events = require("../models/events"),
    Users = require("../models/user"),
    multer = require("multer"),
    path = require("path"),
    _ =  require("lodash"),
    mongoose = require("mongoose");
//setting storage engine
const storage = multer.diskStorage({
    destination: './public/img/events/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 5000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('eventsImage');

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb("Error: Images only!");
    }
}

module.exports = function (router, passport) {

    router.use(function (req, res, next) {
        // check if it is a admin
        if(req.user){
            if(req.user.type) {
                return next();
            }
            else {
                res.redirect("/");
            }
        }else {
            res.redirect("/signIn");
        }
    });
    
    router.get('/events/new', function (req, res) {
        res.render('admin/addNewEvent');
    });

    router.get('/', function (req, res) {
        Events.find({}, function (err, output) {
            if(err){
                console.log("Error: " + JSON.stringify(err));
            }else {
                console.log(output);
                // res.send(output);
                res.render("admin/allEvents", {events: output});
            }
        });
    });

    router.post('/events', function (req, res) {
        console.log("adding new event!");
        upload(req, res, (err) => {
            if(err){
                res.render('admin/addNewEvent', {msg: err});
            }else {
                if (req.file == undefined) {
                    res.render("admin/addNewEvent", {msg: "Error: no file selected!"});
                } else {
                    console.log(req.file);
                    console.log(req.body);
                    Events.create({
                        image: req.file.destination + req.file.filename,
                        name: req.body.name,
                        type: req.body.type,
                        date: req.body.date,
                        venue: req.body.venue,
                        time: req.body.time,
                        fbUrl: req.body.fbUrl,
                        description: req.body.description,
                        short: req.body.short,
                        organisersName: [req.body.name1, req.body.name2, req.body.name3],
                        organisersEmail: [req.body.email1, req.body.email2, req.body.email3],
                        organisersMobile: [req.body.mobile1, req.body.mobile2, req.body.mobile3]
                    }, function (err, event) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("event created: ", JSON.stringify(event));
                            res.redirect("/admin");
                        }
                    });
                }
            }
        });
    });

    router.post("/fetchAllEvents", function (req, res) {
        Events.find({}, function (err, output) {
            if(err){
                console.log("Error: " + JSON.stringify(err));
            }else {
                console.log(output);
                res.send(output);
            }
        });
    });

    router.get('/events/:id', function (req, res) {
        Events.find({
            _id: req.params.id,
        }, function (err, output) {
            if(err)
                console.log("ERROR: " + JSON.stringify(err));
            else{
                console.log("EVENT: " + JSON.stringify(output));
                res.render("admin/viewEvent", {event: output});
            }
        });
    });

    router.get('/events/:id/participants', function (req, res) {
        Events.findById(req.params.id, function (err, event) {
            if(err)
                console.log(err);
            else{
                var users = _.map(event.users, function (id) {
                    return mongoose.Types.ObjectId(id)
                });
                Users.find({
                    '_id': {
                        $in: users
                    }
                }, function (err, output) {
                    if(err)
                        console.log(err);
                    else{
                        console.log("PARTICIPANTS FETCHED!");
                        res.render("admin/participants", {participants: output, eventName: event.name, referrers: event.referrer});
                    }
                });
            }
        });
    });

    router.get('/participants', function (req, res) {
        res.render("admin/allParticipants");
    });

    router.get('/events/:id/edit', function (req, res) {
        Events.findById(req.params.id, function (err, output) {
            if(err)
                console.log(err);
            else{
                res.render("admin/editEvent", {event: output});
            }
        });
    });

    router.put('/events/:id', function (req, res) {
        upload(req, res, (err) => {
            if (err) {
                res.redirect('/admin/events/' + req.params.id + "/edit", {msg: err});
            } else {
                if (req.file == undefined) {
                    Events.findByIdAndUpdate(req.params.id, {
                        // image: req.file.destination + req.file.filename,
                        name: req.body.name,
                        type: req.body.type,
                        date: req.body.date,
                        venue: req.body.venue,
                        time: req.body.time,
                        fbUrl: req.body.fbUrl,
                        description: req.body.description,
                        short: req.body.short,
                        organisersName: [req.body.name1, req.body.name2, req.body.name3],
                        organisersEmail: [req.body.email1, req.body.email2, req.body.email3],
                        organisersMobile: [req.body.mobile1, req.body.mobile2, req.body.mobile3]
                    }, function (err, event) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("event edited: ", JSON.stringify(event));
                            res.redirect("/admin/events/" + req.params.id);
                        }
                    });
                } else {
                    console.log(req.file);
                    console.log(req.body);
                    Events.findByIdAndUpdate(req.params.id, {
                        image: req.file.destination + req.file.filename,
                        name: req.body.name,
                        type: req.body.type,
                        date: req.body.date,
                        venue: req.body.venue,
                        time: req.body.time,
                        fbUrl: req.body.fbUrl,
                        description: req.body.description,
                        short: req.body.short,
                        organisersName: [req.body.name1, req.body.name2, req.body.name3],
                        organisersEmail: [req.body.email1, req.body.email2, req.body.email3],
                        organisersMobile: [req.body.mobile1, req.body.mobile2, req.body.mobile3]
                    }, function (err, event) {
                        if (err)
                            console.log(err);
                        else {
                            console.log("event edited: ", JSON.stringify(event));
                            res.redirect("/admin/events/" + req.params.id);
                        }
                    });
                }
            }
        });
    });
    
    router.delete('/events/:id', function (req, res) {
        Events.findByIdAndRemove(req.params.id, function (err) {
            if(err)
                console.log(err);
            else
                res.redirect("/admin");
        });
    });

};