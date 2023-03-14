import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../components/CheckoutForm";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    //input  stripe key here
    stripePromise = loadStripe(
      "pk_test_51McEfUFqJbr3rUfxvPildIPz8dXuJNXPnKCM33aaBUE2JPgwXfzCE6HWfXQKKVplmqboPck8Y1eYzHk6KdpCHDNX00xCes3PEo"
    );
  }

  return stripePromise;
};

const UserInfo = () => {
  const [userData, setUserData] = useState("");
  // const [stripePromise, setStripePromise] = useState(null);
  //   const [clientSecret, setClientSecret] = useState("");
  //   const publishableKey =
  //     "pk_test_51McEfUFqJbr3rUfxvPildIPz8dXuJNXPnKCM33aaBUE2JPgwXfzCE6HWfXQKKVplmqboPck8Y1eYzHk6KdpCHDNX00xCes3PEo";

  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const item = {
    //input price key here
    price: "price_1MeP8qFqJbr3rUfxbIFV0LNa",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "subscription",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) {
      setStripeError(error.message);
    }
    setLoading(false);
  };

  if (stripeError) alert(stripeError);
  // useEffect(() => {
  //   setStripePromise(loadStripe(publishableKey));
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/create-payment-intent", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (r) => {
  //     const { clientSecret } = await r.json();
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  useEffect(() => {
    fetch("http://localhost:4000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        setUserData(data.data);
      });
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h1>Account Information</h1>
        <h3>First Name: {userData.firstName}</h3>
        <h3>Last Name: {userData.lastName}</h3>
        <h3>UserType: {userData.userType}</h3>
        <button
          className="checkout-button"
          onClick={redirectToCheckout}
          disabled={isLoading}
        >
          <p className="text">{isLoading ? "Loading..." : "Subscribe"}</p>
        </button>
        {/* {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )} */}
      </div>
    </div>
  );
};

export default UserInfo;
