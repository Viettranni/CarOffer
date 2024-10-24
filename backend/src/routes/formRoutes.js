const express = require('express');
const multer = require('multer');
const { createForm, getAllForms, sendToPartners, saveForm, submitForm } = require('../controllers/formControllers');
const router = express.Router();

// Multer configuration
const upload = multer({ dest: 'uploads/' });

// Customer side of APIs
router.post('/submitForm', upload.array('picture', 3), submitForm);
router.post('/forms', createForm);
router.get('/forms', getAllForms);

// Question mark still
router.post('/forms/:formId/send', sendToPartners); //?

// Admin side of APIs
router.put('/forms/:id', saveForm);


module.exports = router;
