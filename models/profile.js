var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(ProfileSchema = new Schema({
  name: String,
  image: String,
  designation: String,

})),
  (ProfileModel = mongoose.model("Profile", ProfileSchema));

module.exports = ProfileModel;
