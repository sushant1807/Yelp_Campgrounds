var epxress = require("express");
var app = epxress();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");


mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

//schema set up


var campgroundSchenma = new mongoose.Schema({
    name:String,
    image:String
});

//DB model setup


var Campground = mongoose.model("Campground",campgroundSchenma);
 

//Landing page 

app.get("/",function(req,res){
res.render("landing");
});

//Get all campgrounds from DB and display on the page

app.get("/campgrounds",function(req,res){
  Campground.find({},function(err,allCampgrounds){
    if(err){
      console.log(err);
    }else{
     res.render("campgrounds",{campgrounds :allCampgrounds});
    }
  });
 

});

//Add campgrounds to DB and Redirect to  allCampgrounds page
app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name,image:image}
  Campground.create(newCampground,function(err,newlyCreated){
    if(err){
        console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  }); 

});

//New campgrounds 

app.get("/campgrounds/new",function(req,res){
 res.render("NewCampground");
});


app.listen(3000,function(){
console.log("yelpcamp Server has strated..");
});