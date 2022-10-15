const express = require('express');
const viewsControllers = require('../controllers/viewsControllers');
const authControllers = require('../controllers/authControllers');
const bookingControllers = require('../controllers/bookingControllers');

 

const router = express.Router();
// router.use(authControllers.isLoggedIn);

router.get('/',bookingControllers.createBookingCheckout, authControllers.isLoggedIn, viewsControllers.getOverview);
router.get('/tour/:slug', authControllers.isLoggedIn, viewsControllers.getTour);
router.get('/login', authControllers.isLoggedIn, viewsControllers.getLoginForm);
router.get('/me', authControllers.protect, viewsControllers.getAccount);
router.get('/my-tours', authControllers.protect, viewsControllers.getMyTours);

router.post(
  '/submit-user-data',
  authControllers.protect,
  viewsControllers.updateUserData
);

module.exports = router;
