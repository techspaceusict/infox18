var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
    res.render("pages/index");
});

app.get('/projects', function (req, res) {
    res.render("pages/projects");
});

app.get('/team', function (req, res) {
    res.render("pages/team");
});

app.get('/join', function (req, res) {
    res.render("pages/join");
});

app.get('/blog', function (req, res) {
    res.render("pages/blog");
});

app.get('/media', function (req, res) {
    res.render("pages/media");
});

app.listen(process.env.PORT || 8080, function(){
    console.log("server started!");
});