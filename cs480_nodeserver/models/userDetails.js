const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    userType: String,
    isSubscribed: { type: Boolean, default: false },
    stripeCustomerId: String,
    profileImage: Object,
  },
  {
    collection: "UserInformation",
  }
);

module.exports = mongoose.model("UserInformation", UserDetailsSchema);
