var express = require("express");
var indexRoute = require("./Routes/index");
var CommentsRoute = require("./Routes/comments");
var CampgroundsRoute =require("./Routes/campgrounds");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose =require("mongoose");
var flash = require("connect-flash");
var app= express();

var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
 
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'))
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//App file Uses All the Routes

app.use(indexRoute);
app.use("/campgrounds/:id/comments",CommentsRoute);
app.use( "/campgrounds",CampgroundsRoute);



//APP RUNNING AT PORT 3000
app.listen(3000,function(){
console.log("yelpcamp Server has strated.... Running at https://localhost:3000");
});