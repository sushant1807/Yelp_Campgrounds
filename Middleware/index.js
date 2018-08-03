var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

var middlewareObj = {};
 
 middlewareObj.checkCampgroundOwnership = function(req,res,next){
   //is User logged In?
        if(req.isAuthenticated()){
          Campground.findById(req.params.id,function(err,foundCampground){
           if(err){
           res.redirect("/campgrounds")
             } else{
              //check current user own the campground 
                 if(foundCampground.author.id.equals(req.user._id)){
                   next();
                 } else {
                          res.send("You are not allowed to do this");
                       }
                   }
              });
         }else{
          res.send("You are not allowed to This");
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
     req.flash("error","Please Login First");
    res.redirect("/login");
  };

module.exports = middlewareObj;