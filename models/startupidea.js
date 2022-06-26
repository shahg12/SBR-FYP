var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(startupIdeaSchema = new Schema({
  title: String,
  description: String,
  
})),
  (StartupIdeaModel = mongoose.model("StartupIdea", startupIdeaSchema));

module.exports = StartupIdeaModel;
