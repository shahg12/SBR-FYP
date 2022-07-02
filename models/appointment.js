var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(AppointmentSchema = new Schema({
  title: String,
  description: String,
  payment: String,
  reason:String
})),
  (AppointmentModel = mongoose.model("Appointment", AppointmentSchema));

module.exports = AppointmentModel;
