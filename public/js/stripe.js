/* eslint-disable */
import { showAlert } from './alerts';
const Stripe= require('stripe');
import axios from "axios"

const stripe=Stripe('pk_test_51Ls0tiSFowCf7acKwJubIrImLrGpuJ5pU5upFWTHgGylqwoWwMLbHlpZRA2mbbBkVBQG70htQf9JJuR9fIKTsD8100p408gAJ1')
  
 export const bookTour=async (tourId)=>{
    try{
     // 1) Get checkout session from endpoint/API
      const session=await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
         console.log(session);

     // 2) Create checkout form + chanre credit card
    //  stripe.redirectToCheckout({ sessionId: session.id })    
    window.location.replace(session.data.session.url);    
}catch(err){
        console.log(err);
        showAlert('error',err)  
    }
 }  
