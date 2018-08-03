var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var  middleware =require("../Middleware");



router.get("/new", middleware.isLoggedIn,function(req,res){
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

router.post("/",middleware.isLoggedIn,function(req,res){
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
         comment.author.id = req.user._id;
         comment.author.username = req.user.username;
         comment.save();
         campground.comments.push(comment);
         campground.save();
         res.redirect('/campgrounds/'+campground._id);
       }
    });
  }
});
});

//EDIT COMMENT 

router.get("/:comment_id/edit", middleware.checkCommentsOwnership ,function(req,res){
  //findbyId and comment
  Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err){
      res.send(err)
    }else{
      res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
    }
  })
});

//UPDATE COMMENT

router.put("/:comment_id",function(req,res){
  //findbyId and Remove
 Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
  if(err){
    res.redirect("back");
  }else{
    res.redirect("/campgrounds/"+req.params.id);
  }
})
});

//DELETE COMMENT

router.delete("/:comment_id",function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
   if(err){
     res.send(err);
   }else{
     res.redirect("/campgrounds/"+req.params.id);
   }
 });
});

module.exports = router;