const Tour=require('../models/tourModel')
const Booking=require('../models/bookingModel')
const Stripe=require('stripe') 
const catchAsync=require('../utils/catchAsync')
const factory =require('./handlerFactory')


exports.getCheckoutSession=catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourID);
   
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourID}&user=${req.params.id}$price=${tour.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'inr',
              unit_amount: tour.price,
              product_data: {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
              },
            },
          },
        ],
      });
    
  
    // 3) Create session as response
    res.status(200).json({
      status: 'success',
      session
    });
  });

  exports.createBookingCheckout=catchAsync(async (req,res,next)=>{
   
    //This is TEMPORARY, because it's USECURE: everyone can make booking without paying

    const {tour,user,price}=req.query;
        

    // console.log(req.query);

     if(!tour && !user && !price) return next();

    await Booking.create({tour ,user, price});

    // console.log(await Booking.find())
   
    //next();

    res.redirect(req.originalUrl.split('?')[0])
  })        


  
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);