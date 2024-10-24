const Form = require('../models/Form');
const sendEmail = require('../../utils/sendEmail');

// Customer side of logics
exports.submitForm = async (req, res) => {
  try {
    // Access form fields
    const { 
      email, 
      fullName, 
      registerNumber, 
      carModel, 
      carModelEquipmentPackage, 
      carYear, 
      gear, 
      milages, 
      carsBody, 
      carsWindscreen, 
      summerWheels, 
      winterWheels, 
      maintenanceRecord, 
      maintenanceHistory, 
      timingBelt, 
      additionalInformation, 
      priceEstimation 
    } = req.body;

    // Access uploaded files
    const pictures = req.files.map(file => file.path); // Store the file paths in the pictures array

    // Create a new form entry
    const newFormEntry = new Form({
      email,
      fullName,
      registerNumber,
      carModel,
      carModelEquipmentPackage,
      carYear,
      gear,
      milages,
      carsBody,
      carsWindscreen,
      summerWheels,
      winterWheels,
      maintenanceRecord,
      maintenanceHistory,
      timingBelt,
      additionalInformation,
      priceEstimation,
      picture: pictures, // Store the paths of uploaded pictures
    });

    // Save to database
    await newFormEntry.save();

    res.status(201).send({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.createForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendToPartners = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);
    
    // Call email sending function for partners
    await sendEmail(form);
    
    res.json({ message: 'Form details sent to partners!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin side of functions
exports.saveForm = async (req, res) => {
  const { id } = req.params; 
  const updatedFormData = req.body; 

  try {
      const updatedForm = await Form.findByIdAndUpdate(id, updatedFormData, { new: true });
      if (!updatedForm) {
          return res.status(404).json({ error: "Form not found" });
      }
      res.json(updatedForm); // Send the updated form back
  } catch (error) {
      res.status(500).json({ error: "Error saving form" });
  }
};
