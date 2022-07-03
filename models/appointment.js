var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(AppointmentSchema = new Schema({
  cardNumber: String,
  cardHolder: String,
  expireDate: String, 
  cvv:String
})),
  (AppointmentModel = mongoose.model("Appointment", AppointmentSchema));

module.exports = AppointmentModel;
