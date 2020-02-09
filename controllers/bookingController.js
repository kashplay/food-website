const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const bookingModel = require("../models/bookingModel");
// const stripe = require("stripe");
const SK = process.env.SK;
const stripe = require('stripe')(SK);
module.exports.createCheckoutSession = async function (req, res) {
  const id = req.params.id;
  const user = req.user;
  const userId = user["_id"];
  const plan = await planModel.findById(id);
  console.log(plan);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: plan.name,
      description: plan.description,
      amount: plan.price * 100,
      currency: 'inr',
      quantity: 1,
    }],
    success_url: `${req.protocol}//${req.get("host")}/me`,
    cancel_url: `${req.protocol}//${req.get("host")}/login`,
  });
  // req.protocol
// req.headers.hostnam
  res.json({
    session,
    userId
  })









  // id=> planModel.findbyId
  // session=> npm install stripe 








}

module.exports.createNewBooking = async function (req, res) {
  const planId = req.body.planId;
  const userId = req.body.userId;
  const user = await userModel.findById(userId);
  const plan = await planModel.findById(planId);

  if (user.userBookedPlansId == undefined) {
    // 1 first time user
    const order = {
      userId: userId,
      bookedPlans: [
        {
          planId: planId,
          name: plan.name,
          currentPrice: plan.price

        }
      ]
    }
    // create a new users booking
    const newOrder = await bookingModel.create(order);
    // user update
    user.userBookedPlansId = newOrder["_id"];
    await user.save({ validateBeforeSave: false });
    return res.json({
      newOrder
    });
  }
  else {
    const newPlan = {
      planId: planId,
      name: plan.name,
      currentPrice: plan.price
    }
    const booking = await bookingModel.findById(user.userBookedPlansId);
    booking.bookedPlans.push(newPlan);
    const newBookedPlans = booking.bookedPlans;
    const newbooking = await bookingModel.findByIdAndUpdate(booking["_id"], {
      bookedPlans: newBookedPlans
    }, { new: true });
    return res.json({
      newbooking,
      success: "New Plan Added"
    });
  }


  // 2. previous user
  // user => search 


}
