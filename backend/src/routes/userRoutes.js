const express = require('express');
const { getReceiverEmails, saveReceiverEmails } = require('../controllers/userController');
const router = express.Router();

router.get('/getEmails', getReceiverEmails);
router.put('/updateEmails', saveReceiverEmails);

module.exports = router;
