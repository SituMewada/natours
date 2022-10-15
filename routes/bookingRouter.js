const express = require('express');
const bookingControllers = require('../controllers/bookingControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();
 

router.get('/checkout-session/:tourID',
 authControllers.protect,
 bookingControllers.getCheckoutSession)

module.exports=router; 