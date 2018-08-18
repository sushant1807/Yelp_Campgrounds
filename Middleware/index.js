var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

var middlewareObj = {};
 
 middlewareObj.checkCampgroundOwnership = function(req,res,next){
   //is User logged In?
        if(req.isAuthenticated()){
          Campground.findById(req.params.id,function(err,foundCampground){
           if(err){
             req.flash("error","Campground Not Found !")
           res.redirect("/campgrounds")
             } else{
              //check current user own the campground 
                 if(foundCampground.author.id.equals(req.user._id)){
                   next();
                 } else {
                   req.flash("error","you don't have permission to do that ");
                          res.redirect("back");
                       }
                   }
              });
         }else{
          req.flash("error","you need to be logged in to do that")
          res.redirect("back");
         } 
     };

middlewareObj.checkCommentsOwnership = function(req,res,next){

  //is User logged In?
     if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                 res.redirect("/campgrounds/edit")
              }else{
                      //check current user own the comment
                     if(foundComment.author.id.equals(req.user._id)){
                      next();
                    }else {
                  res.send("You are not allowed to do this");
                }
              }
         });

         }else{
        res.redirect("/login");
      } 
    };
    
middlewareObj.isLoggedIn = function(req,res,next){
   if(req.isAuthenticated()){
       return next();
     }
     req.flash("error","You need to be logged in to do that !");
    res.redirect("/login");
  };

module.exports = middlewareObj;