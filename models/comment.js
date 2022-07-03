var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(CommentSchema = new Schema({
  message: String,
  rating: String,

})),
  (CommenttModel = mongoose.model("Comment", CommentSchema));

module.exports = CommenttModel;
