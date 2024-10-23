const express = require('express');
const { createVehicle, getAllVehicles, sendToPartners } = require('../controllers/vehicleController');
const router = express.Router();

router.post('/vehicles', createVehicle);
router.get('/vehicles', getAllVehicles);
router.post('/vehicles/:vehicleId/send', sendToPartners);

module.exports = router;
