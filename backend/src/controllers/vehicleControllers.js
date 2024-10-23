const Vehicle = require('../models/Vehicle');
const sendEmail = require('../../utils/sendEmail');

exports.createVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendToPartners = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findById(vehicleId);
    
    // Call email sending function for partners
    await sendEmail(vehicle);
    
    res.json({ message: 'Vehicle details sent to partners!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
