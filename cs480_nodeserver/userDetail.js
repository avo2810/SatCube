const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    userType: String,
  },
  {
    collection: "UserInformation",
  }
);

mongoose.model("UserInformation", UserDetailsSchema);
