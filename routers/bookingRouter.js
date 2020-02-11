const express = require("express");
const bookingRouter = express.Router();
const { createCheckoutSession,createNewBooking } = require("../controllers/bookingController");
const {protectRoute}=require("../controllers/authController");
bookingRouter.use(protectRoute)

bookingRouter.get("/:id", createCheckoutSession);
module.exports = bookingRouter;