const Events = require("../models/events"),
    Users = require("../models/user"),
    multer = require("multer"),
    _ = require("lodash"),
    mongoose = require("mongoose"),
    path = require("path");
//setting storage engine
const storage = multer.diskStorage({
    destination: './public/img/users/',
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
}).single('profilePic');

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

module.exports = function (router) {
    router.use(function (req, res, next) {
        if(req.isAuthenticated() === true){
            return next();
        }else{
            res.redirect("/signIn");
        }
    });

    router.get("/profile", function (req, res) {
        res.render("user/profile", {user: req.user, msg: "hmmm"});
    });

    router.put("/profile/:id", function (req, res) {
        upload(req, res, (err) => {
            if(err) {
                console.log(err);
                res.render("user/profile", {msg: err});
            }else{
                console.log(req.file);
                if(req.file == undefined){
                    Users.findByIdAndUpdate(req.params.id, {
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email,
                        college: req.body.college,
                        degree: req.body.degree,
                        branch: req.body.branch,
                        year: req.body.year
                    }, function (err, user) {
                        if(err)
                            console.log(err);
                        else{
                            console.log("info updated w/o pic");
                            res.redirect("/user/dashboard");
                        }
                    });
                }else{
                    console.log(req.file);
                    console.log(req.body);
                    Users.findByIdAndUpdate(req.params.id, {
                        image: req.file.destination + req.file.filename,
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email,
                        college: req.body.college,
                        degree: req.body.degree,
                        branch: req.body.branch,
                        year: req.body.year
                    }, function (err, user) {
                        if(err)
                            console.log(err);
                        else{
                            console.log("info updated");
                            res.redirect("/user/dashboard");
                        }
                    });
                }
            }
        });
    });

    router.get("/dashboard", function (req, res) {
        console.log(req.user.events);
        var ids = _.map(req.user.events, function (id) {
            return mongoose.Types.ObjectId(id)
        });

        console.log(ids);

        Events.find({
            '_id': {
                 $in: ids
            }
        }, function (err, output) {
            if(err)
                console.log(err);
            else {
                console.log("EVENTS LIST:" + JSON.stringify(output));
                res.render("user/dashboard", {events: output});
            }
        });
    });
};