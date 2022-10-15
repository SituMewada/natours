const express = require('express');
const viewsControllers = require('../controllers/viewsControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();
// router.use(authControllers.isLoggedIn);

router.get('/', authControllers.isLoggedIn, viewsControllers.getOverview);
router.get('/tour/:slug', authControllers.isLoggedIn, viewsControllers.getTour);
router.get('/login', authControllers.isLoggedIn, viewsControllers.getLoginForm);
router.get('/me', authControllers.protect, viewsControllers.getAccount);

router.post(
  '/submit-user-data',
  authControllers.protect,
  viewsControllers.updateUserData
);

module.exports = router;
