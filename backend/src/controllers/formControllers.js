const Form = require('../models/Form');
const sendEmail = require('../../utils/sendEmail');

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
