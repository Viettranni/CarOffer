const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  registerNumber: { type: String, required: true },
  carModel: { type: String, required: true },
  carModelEquipmentPackage: { type: String, required: false },
  carYear: { type: String, required: true },
  gear: { type: String, required: true },
  milages: { type: String, required: true },
  carsBody: { type: String, required: true },
  carsWindscreen: { type: String, required: true },
  summerWheels: { type: String, required: true },
  winterWheels: { type: String, required: true },
  maintenanceRecord: { type: String, required: true },
  maintenanceHistory: { type: String, required: true },
  timingBelt: { type: String, required: true },
  additionalInformation: { type: String, required: false },
  priceEstimation: { type: String, required: true },
  picture: { type: Array, required: true },

});

module.exports = mongoose.model("Form", formSchema);
