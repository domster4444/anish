const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    busCode: {
      type: String,
      unique: true,
    },
    // name = vehicleNumber
    name: {
      type: String,
      required: [true, "Please add a vehicle number"],
    },
    registerNumber: {
      type: String,
    },
    noOfSeats: {
      type: Number,
      required: [true, "Please add a no of seats"],
    },
    maximumAllowed: {
      type: Number,
      required: [true, "Please add a maximum allowed"],
    },
    vehicleType: {
      type: String,
      enum: ["ownership", "contract", "hired", "leased", "rented", "others"],
      required: [true, "Please add a vehicle type"],
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "cng"],
      required: [true, "Please add a fuel type"],
    },
    description: {
      type: String,
    },
    contactPerson: {
      type: String,
      required: [true, "Please add a contact person"],
    },
    insuranceRenewalDate: {
      type: Date,
    },
    attachment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
