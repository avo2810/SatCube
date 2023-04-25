const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
//import ejs to allow using html in node js

require("dotenv").config();
const cloudinaryModule = require("cloudinary");

const cloudinary = cloudinaryModule.v2;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Stripe payment
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const priceId = process.env.PUBLIC_STRIPE_PRICE_ID;

const JWT_SECRET = process.env.JWT_SECRET_KEY;

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

require("./models/userDetails");
require("./models/postSchema")
const User = mongoose.model("UserInformation");
const Post = mongoose.model("Post")

app.post("/register", async (request, response) => {
  const { firstName, lastName, email, password, userType } = request.body;

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
      userType,
      isSubscribed: false,
      stripeCustomerId: "",
    });
    response.send({ status: "ok" });
  } catch (error) {
    response.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    //successfull
    console.log(token);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

//To get user data from the database when they logged in successfully
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Sprint 2
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:4000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "thyanh151203@gmail.com",
        pass: "wafnavsrxvlyvdbw",
      },
    });

    var mailOptions = {
      from: "thyanh151203@gmail.com",
      to: "avo20@apu.edu",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

//check whether the token and id is correct or not, if so, it will go to ResetPasswordForm,
//if not, it will output not verified. When the user enter the old andnew password,
//they will get directed automatically to app.post("/reset-password/:id/:token")
app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", {
      email: verify.email,
      status: "Not Verified",
    });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

//In this, we first check whether the id and token is the same or not, if so, we will change the password
app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.json({ status: "Password Updated" });
    res.render("index", {
      email: verify.email,
      status: "verified",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userID } = req.body;
  try {
    //this function is provided by mongoDB
    User.deleteOne(
      {
        _id: userID,
      },
      function (err, res) {
        console.log(err);
      }
    );
    res.send({ status: "ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const email = req.body.email;

  const customer = await stripe.customers.create({
    email,
    metadata: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customer.id,
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send({ url: session.url });
});

//Configure which user is subscribed
const addSubscription = async (customer) => {
  const customerEmail = customer.email;
  const updatedFields = {
    userType: "Subscribed User",
    isSubscribed: true,
    stripeCustomerId: customer.id,
  };
  try {
    await User.findOneAndUpdate(
      { email: customerEmail },
      { $set: updatedFields },
      { new: true }
    );
    console.log(`User ${customerEmail} 's subscription updated successfully!`);
  } catch (error) {
    console.log(error);
  }
};

//Stripe Webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let data;
    let eventType;
    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
        console.log("Webhook verified");
      } catch (err) {
        console.log("Webhokk failed");
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }
    // Handle the event
    switch (eventType) {
      case "checkout.session.completed":
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            addSubscription(customer);
          })
          .catch((err) => console.log(err));
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;
      default:
      // Unhandled event type
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

app.post("/cancel-subscription", async (req, res) => {
  const customerID = req.body.stripeCustomerId;
  const email = req.body.email;

  const subscriptions = await stripe.subscriptions.list({
    customer: customerID,
    status: "active",
    limit: 1,
  });

  const sub = subscriptions.data[0].id;

  await stripe.subscriptions.update(sub, { cancel_at_period_end: true });

  const updatedFields = {
    userType: "Regular User",
    isSubscribed: false,
  };
  await User.findOneAndUpdate(
    { email },
    { $set: updatedFields },
    { new: true }
  );
  // Send a success response
  res.send("Subscription cancelled successfully");
});

app.post("/edit-profile", async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const newFirstName = req.body.firstName;
  const newLastName = req.body.lastName;
  const uploadImage = req.body.profileUploadImage;
  let updatedFields, encryptedPassword;
  let newImage = "";

  if (newPassword) {
    encryptedPassword = await bcrypt.hash(newPassword, 10);
  }
  if (uploadImage) {
    const uploadRes = await cloudinary.uploader.upload(uploadImage, {
      upload_preset: "satcube-profile-image",
    });
    if (uploadRes) {
      newImage = uploadRes;
    }
  }
  if (!newPassword) {
    updatedFields = {
      firstName: newFirstName,
      lastName: newLastName,
      profileImage: newImage,
    };
  } else {
    updatedFields = {
      firstName: newFirstName,
      lastName: newLastName,
      password: encryptedPassword,
      profileImage: newImage,
    };
  }
  await User.findOneAndUpdate(
    { email },
    { $set: updatedFields },
    { new: true }
  );
  // Send a success response
  res.send("Successfully update user information.");
});

app.post("/api/post", async (req, res)=>{
  console.log(req.body)
  try{
    const result = await Post.create({
      title: req.body.title,
      body: req.body.body
    })

    res.json(result)
  } catch(e){
    console.log(e)
  }
});

app.get("/api/post", async (req, res)=>{
  try{
    const result = await Post.find({})

    res.json(result)
  } catch(e){
    console.log(e)
  }
})

app.listen(8080, () => {
  console.log("Server Started" , 8080);
});
