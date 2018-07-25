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
    image:String,
    description:String
});

//DB model setup


var Campground = mongoose.model("Campground",campgroundSchenma);


/*  
Campground.create(
  {
    name:"savigny-sur-orge",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3LdkliSnSyLOOwMB_QRCvoqetXRxgpn9vhyInAWFy7SkFucs",
    description:"This is the best place stay at the campground"
  },
  function(err,campground){

  if(err){
    console.log(err)
  }else{
    console.log("New Campground has been created");
    console.log(campground);
  }
}) */;



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
     res.render("index",{campgrounds :allCampgrounds});
    }
  });
});

//Add campgrounds to DB and Redirect to  allCampgrounds page

app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc =req.body.description;
  var newCampground = {
    name:name,
    image:image,
    description:desc
  };
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
res.render("new");
});


//show description about one campground

app.get("/campgrounds/:id",function(req,res){
Campground.findById(req.params.id,function(err,foundCampground){
  if(err){
     console.log(err);
     }else{
   res.render("show",{campgrounds:foundCampground});
  };
});
});


app.listen(3000,function(){
console.log("yelpcamp Server has strated..");
});