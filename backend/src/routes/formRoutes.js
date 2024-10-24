const express = require('express');
const { createForm, getAllForms, sendToPartners } = require('../controllers/formControllers');
const router = express.Router();

router.post('/forms', createForm);
router.get('/forms', getAllForms);
router.post('/forms/:formId/send', sendToPartners);

module.exports = router;
