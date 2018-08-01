var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
  
  //GET ALL CAMPGROUNDS TO INDEX PAGE 
  
  router.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
      if(err){
        console.log(err);
      }else{
       res.render("campgrounds/index",{campgrounds:allCampgrounds});
      }
    });
  });
  
  //POST ALL CAMPGROUNDS TO DB AND REDIRECT TO CAMGROUNDS PAGE
  
  router.post("/campgrounds",function(req,res){
  
  
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
  
  router.get("/campgrounds/new",function(req,res){
  
  res.render("campgrounds/new");
  
  });
  
  
  //SHOW ALL CAMPGROUNDS ROUTE
  
  router.get("/campgrounds/:id",function(req,res){
     //find a campground with Provided ID
      Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
           console.log(err);
           }else{
          res.render("campgrounds/show",{campgrounds:foundCampground});
        };
      });
  
  });
  module.exports = router;