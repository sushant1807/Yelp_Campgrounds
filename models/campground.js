
var mongoose = require("mongoose");
var campgroundSchenma = new mongoose.Schema({
  name:String,
  image:String,
  description:String
});
module.exports = mongoose.model("Campground",campgroundSchenma);