var mongoose =require("mongoose");
var Campground = require("./models/campground");


var data = [
  {
    name :"karimnagar campground",
  image:"https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
   description:"added new campground"
 },
 {
  name :"karimnagar campground",
  image:"https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
  description:"added new campground"
},
{
  name :"karimnagar campground",
  image:"https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
  description:"added new campground"
}
];

function seedDB(){
  //Remove all campgrounds 
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("removed all campgrounds")
    }
    data.forEach(function(seed){
      Campground.create(seed,function(err,data){
        if(err){
          console.log(err);
        }else{
          console.log("campground added");
        }
      });
      });
   });
 }
module.exports =seedDB;
