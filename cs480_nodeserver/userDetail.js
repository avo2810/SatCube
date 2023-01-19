const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInformation",
  }
);

mongoose.model("UserInformation", UserDetailsScehma);
