"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeInfo, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import SubscriptionPlane from "./_components/SubscriptionPlane";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Subscriptions } from "@/utils/Schema";
import { db } from "@/utils/DB";
import moment from "moment";
import { useAppContext } from "@/hooks/useAppContext";
import { plans } from "@/app/(data)/SubscriptionPlans";

function Billing() {
  type PERIOD = "week" | "month" | "year";
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [currentPlane, setCurrentPlan] = useState("");

  function getCreditByType(type: PERIOD) {
    let totalCredits = 10000;
    if (type == "week") {
      totalCredits = 50000;
      console.log("type ", totalCredits);
    } else if (type == "month") {
      totalCredits = 250000;
    } else if (type == "year") {
      dispatch({
        type: "SET_UNLIMITED_CREDITS",
      });
    }
    return totalCredits;
  }

  function handleSubscription(type: PERIOD) {
    setLoading(true);
    console.log("Handle subscription:", type);

    axios
      .post("/api/create-subscription", JSON.stringify({ type }))
      .then((res) => {
        console.log(res.data);
        setCurrentPlan(type);
        onSubscription(res.data.id, type);
      })
      .catch((err) => {
        console.error("Error creating subscription:", err);
        setLoading(false);
      });
  }

  function onSubscription(subId: string, type: PERIOD) {
    const options = {
      key: process.env.NEXT_PUBLIC_KEY_ID || "",
      subscription_id: subId,
      name: "Scriptify AI Apps",
      description: `${type} Subscription`,
      handler: async (response: any) => {
        console.log("Payment successful:", response);
        if (response) {
          saveSubscription(response?.razorpay_payment_id, type);
          dispatch({
            type: "SET_SUBSCRIPTION_TYPE",
            payload: type,
          });
          dispatch({
            type: "SET_TOTAL_CREDITS",
            payload: getCreditByType(type),
          });
        }
        setLoading(false);
      },
      prefill: {
        email: user?.primaryEmailAddress?.emailAddress, // Prefill customer details if available
      },
    };

    if (!options.key) {
      console.error(
        "Razorpay Key ID is missing. Check your environment variables."
      );
      setLoading(false);
      return;
    }

    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.Razorpay) {
        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error("Razorpay is not available in the current context.");
      }
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      setLoading(false);
    }
  }

  async function saveSubscription(paymentId: string, type: PERIOD) {
    const endDateDate = moment().add(1, type).toDate();
    if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
      const result = await db.insert(Subscriptions).values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        type: type,
        paymentId: paymentId,
        joinDate: moment().toDate(),
        endDate: endDateDate,
      });

      if (result) {
        // router.push("/");
      }
    }
  }
  return (
    <div className="max-sm:p-5 p-10">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <ToastContainer />
      <Button className="text-white font-bold" onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>
      <div className="p-5">
        {/* <h2 className="font-bold text-4xl mb-1 p-4 text-center">
          Choose the Perfect Plan for Your Needs
        </h2> */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 max-sm:p-1 p-10">
          {plans.map((plan) => (
            <SubscriptionPlane
              key={plan.title}
              plan={plan}
              currentPlane={state.subscriptionType}
              handleSubscription={handleSubscription}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Billing;
