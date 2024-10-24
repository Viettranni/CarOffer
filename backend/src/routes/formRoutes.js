const express = require('express');
const { createVehicle, getAllVehicles, sendToPartners } = require('../controllers/vehicleController');
const router = express.Router();

router.post('/form', createForm);
router.get('/form', getAllForms);
router.post('/vehicles/:vehicleId/send', sendToPartners);

module.exports = router;
