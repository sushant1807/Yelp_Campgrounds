var express = require("express");
var indexRoute = require("./Routes/index");
var CommentsRoute = require("./Routes/comments");
var CampgroundsRoute =require("./Routes/campgrounds");
var app= express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");

var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
 


 
    


mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
//PASSPORT CONFIGURATION
app.use(require("express-session")({
 secret : "I am a cool boy",
 resave:false,
 saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Current User

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});
app.use(CommentsRoute);
app.use(CampgroundsRoute);
app.use(indexRoute);








//APP RUNNING AT PORT 3000

app.listen(3000,function(){
console.log("yelpcamp Server has strated....");
});