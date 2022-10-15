const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with ID', 404));

    res.status(204).json({
      status: 'success',
      message: null,
    });
  });

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) return next(new AppError('No tour found with ID', 404));

//   res.status(204).json({
//     status: 'success',
//     message: null,
//   });
// });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const newTour=new Tour();
    // newTour.save();
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) return next(new AppError('No tour found with ID', 404));

    res.status(200).json({
      status: 'success',
      data: { doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //To allwo for nested GET reviews on tour (it's a small hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    // console.log(req.query);
    // //BUILD THE QUERY
    // //[1A] FILTERING
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // excludedFields.forEach((el) => delete queryObj[el]);

    // // const tours = Tour.find({
    // //   duration: 5,
    // //   difficulty: 'easy',
    // // });
    // //{difficulty : 'easy' , duration : { $gte : 5 }} -->we want this
    // //{difficulty : 'easy' , duration : { gte : 5 }} -->but we get this so

    // //[1B] Advance filtering

    // let queryStr = JSON.stringify(req.query);
    // queryStr = queryStr.replace(
    //   /\b(gte|gt|lte|lt )\b/g,
    //   (match) => `$${match}`
    // );
    // // console.log(JSON.parse(queryStr));

    // //console.log(req.query);
    // // const tours=await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
    // let query;
    // if (queryStr.includes('$')) {
    //   query = Tour.find(JSON.parse(queryStr));
    // } else {
    //   query = Tour.find();
    // }

    // //[2] SORTING
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   // console.log(sortBy);
    //   query = query.sort(sortBy);
    //   //console.log(query.sort(req.query.sort));
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // // 3) FIELD LIMITING
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }
    // // 4) PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exist!');
    // }

    //EXCUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // console.log(features.query);

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { doc },
    });
  });
