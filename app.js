var epxress = require("express");
var app = epxress();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var Campground = require("./models/campground");
var Comment =require("./models/comment");
var localStrategy = ("passport-local");
var passport = require("passport");
var User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");


//LANDING PAGE

app.get("/",function(req,res){
res.render("landing");
});

//GET ALL CAMPGROUNDS TO INDEX PAGE 

app.get("/campgrounds",function(req,res){

  Campground.find({},function(err,allCampgrounds){
    if(err){
      console.log(err);
    }else{
     res.render("campgrounds/index",{campgrounds :allCampgrounds});
    }
  });
});

//POST ALL CAMPGROUNDS TO DB AND REDIRECT TO CAMGROUNDS PAGE

app.post("/campgrounds",function(req,res){
 /*  var name = req.body.name;
  var image = req.body.image;
  var desc =req.body.description;
  var newCampground = {
    name:name,
    image:image,
    description:desc
  }; */
  var newCampground = req.body.Campground;
  Campground.create(newCampground,function(err,newlyCreated){
    if(err){
        console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  }); 
});

//ADD NEW CAMPGROUND TEMPLATE

app.get("/campgrounds/new",function(req,res){
res.render("campgrounds/new");
});


//SHOW ALL CAMPGROUNDS ROUTE

app.get("/campgrounds/:id",function(req,res){
   //find a campground with Provided ID
Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
  if(err){
     console.log(err);
     }else{
    res.render("campgrounds/show",{campgrounds:foundCampground});
  };
});
});

//==================COMMMENTS ROUTES==========================//

//GET COMMENTS ROUTE

app.get("/campgrounds/:id/comments/new",function(req,res){
  //find capmground by ID
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground:campground});
    }
  })
 
});
 

//POST ALL COMMENTS ROUTE
app.post("/campgrounds/:id/comments",function(req,res){
 //lookup campground using ID
Campground.findById(req.params.id,function(err,campground){
  if(err){
    console.log(err);
    res.redirect("/campgrounds")
  }else{
    Comment.create(req.body.comment ,function(err,comment){
      if(err){
          console.log(err);
      }else{
        campground.comments.push(comment);
        campground.save();
        res.redirect('/campgrounds/'+campground._id);
      }
    }); 
  
  }
});
 //create new comment
 //
  
});

//APP RUNNING AT PORT 3000

app.listen(3000,function(){
console.log("yelpcamp Server has strated..");
});