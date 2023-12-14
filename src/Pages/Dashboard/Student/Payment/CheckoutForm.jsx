import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useCart from "../../../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [carts] = useCart();
  const navigate = useNavigate();

  // console.log(carts);

  // const totalCost = parseFloat(carts?.price);
  // // console.log(totalCost);

  const totalCost = carts.reduce((total, item) => {
    const floatPrice = parseFloat(item?.price);

    if (!isNaN(floatPrice)) {
      return total + floatPrice;
    } else {
      total;
    }
  }, 0);

  // console.log(totalCost);

  useEffect(() => {
    if (totalCost > 0) {
      axiosSecure
        .post("/api/v1/create-payment-intent", { price: totalCost })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    //   confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("confirmation error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        // toast.success("Payment Successfull!");
        // setTransactionId(paymentIntent.id);
        // console.log(transactionId, paymentIntent.id);

        const payment = {
          transactionId: paymentIntent.id,
          email: user?.email,
          date: new Date(),
          price: totalCost,
          cartIds: carts?.map((item) => item._id),
          classId: carts?.map((item) => item?.classId),
        };

        const res = await axiosSecure.post("/api/v1/add-payment", payment);
        console.log(res.data);
        if (res.data.message) {
          toast.error("Already Enrolled this Course");
          navigate("/all-classes");
          return;
        } else {
          toast.success("You enrolled this course!");
          setTransactionId(paymentIntent.id);
          navigate("/student/enroll-class");
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-neutral btn-md mt-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600 font-medium mt-5">{error}</p>
        {transactionId && (
          <p className="text-green-600 font-medium">
            Your transactionId is: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
