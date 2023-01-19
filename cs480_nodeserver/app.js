const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://satcube480:CS480capstoneproject@cluster0.76m4eav.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetail");
const User = mongoose.model("UserInformation");

app.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return response.json({ error: "User Exists" });
    }
    await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    response.send({ status: "ok" });
  } catch (error) {
    response.send({ status: "error" });
  }
});

app.listen(4000, () => {
  console.log("Server Started");
});
