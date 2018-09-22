const Events = require("../models/events");
const multer = require("multer");
const path = require("path");
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
    const filetypes = /jpeg|jpg|png|gif/;
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

    router.get('/events/:id/edit', function (req, res) {
        res.send("edit event");
    });

    router.put('/events/:id', function (req, res) {

    });
    
    router.delete('events/:id', function (req, res) {
        
    })

};