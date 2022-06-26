var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(ideaSchema = new Schema({
  title: String,
  description: String,
  isAdminApproved:Boolean
})),
  (IdeaModel = mongoose.model("Idea", ideaSchema));

module.exports = IdeaModel;
