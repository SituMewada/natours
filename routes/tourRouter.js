const express = require('express');
const toursControllers = require('../controllers/tourControllers');
const authControllers = require('../controllers/authControllers');
const reviewRouter = require('../routes/reviewRouter');

const router = express.Router();

// router.param('id', toursControllers.checkID);

//NESTED ROUTES WITH EXPRESS
// POST /tour/48hf847r8/review
router.use('/:tourId/reviews', reviewRouter);

//MIDDLEWARE
router
  .route('/top-5-cheap')
  .get(toursControllers.aliasTopTours, toursControllers.getAllTours);

router.route('/tour-stats').get(toursControllers.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide', 'guide'),
    toursControllers.getMonthlyPla
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(toursControllers.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router
  .route('/distances/:latlng/unit/:unit')
  .get(toursControllers.getDistances);

router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    toursControllers.createTour
  );
router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    toursControllers.uploadTourImages,
    toursControllers.resizeTourImages,
    toursControllers.updateTour
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    toursControllers.deleteTour
  );

// POST /tour/48hf847r8/review
// GET /tour/dj7489hf87/review
// GET /tour/sjkhd83r79/review/7h8873hd7

// router
// .route('/:tourId/reviews')
// .post(
//   authControllers.protect,
//   authControllers.restrictTo('user'),
//   reviewControllers.createReview
// );

module.exports = router;
