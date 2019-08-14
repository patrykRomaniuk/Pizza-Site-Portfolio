import React from 'react'
import StripeCheckout from "react-stripe-checkout";
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import axios from 'axios';

const Stripe = ({ allPizzaPrices }) => {
    const handleToken = async (token, addresses) => {
        const response = await axios.post(
          "http://localhost:5000/api/users/checkout",
          { token, allPizzaPrices }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
  }
    return (
        <div>
             <StripeCheckout
                stripeKey="pk_test_8kqqhrvpHxX7tedSB4BoIGPq00jXQH6PH5"
                token={handleToken}
                amount={allPizzaPrices * 1}
                name="Dream Pizza"
                billingAddress
                shippingAddress
                />
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    allPizzaPrices: state.auth.allPizzaPrices
});

export default connect(mapStateToProps)(Stripe);
