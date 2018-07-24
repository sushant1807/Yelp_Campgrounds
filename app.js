var epxress = require("express");
var app = epxress();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
var campgrounds = [
  { name:"paris",image:"https://www.photosforclass.com/download/pixabay-2974050?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Feb3cb60b28f1013ed1584d05fb1d4e97e07ee3d21cac104496f2c57ca7eeb3b0_960.jpg&user=back_road_ramblers"},
  { name:"milan",image:"https://www.photosforclass.com/download/pixabay-1439061?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104496f2c57ca7eeb3b0_960.jpg&user=markusspiske"},
  { name:"london",image:"https://www.photosforclass.com/download/flickr-3062207412"} 
]
//Landing page 
app.get("/",function(req,res){
res.render("landing");
});

//campgrounds page
app.get("/campgrounds",function(req,res){
 
res.render("campgrounds",{campgrounds :campgrounds});
});

//campgrounds post page 
app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name,image:image}
  campgrounds.push(newCampground);
 res.redirect("/campgrounds");
});

//New campgrounds 
app.get("/campgrounds/new",function(req,res){
 res.render("NewCampground");
});


app.listen(3000,function(){
console.log("yelpcamp Server has strated..");
});