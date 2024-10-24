const express = require('express');
const { createForm, getAllForms, sendToPartners, saveForm } = require('../controllers/formControllers');
const router = express.Router();

// Customer side of APIs
router.post('/forms', createForm);
router.get('/forms', getAllForms);

// Question mark still
router.post('/forms/:formId/send', sendToPartners); //?

// Admin side of APIs
router.put('/forms/:id', saveForm);


module.exports = router;
