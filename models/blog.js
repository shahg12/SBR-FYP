var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(blogSchema = new Schema({
  title: String,
  description: String,
  image: String,
})),
  (BlogModel = mongoose.model("Blog", blogSchema));

module.exports = BlogModel;
