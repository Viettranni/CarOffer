const express = require('express');
const { createForm, getAllForms, sendToPartners } = require('../controllers/formControllers');
const router = express.Router();

router.post('/form', createForm);
router.get('/form', getAllForms);
router.post('/forms/:formId/send', sendToPartners);

module.exports = router;
