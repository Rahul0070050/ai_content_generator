// pages/billing.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscriptionPlan, { Period } from "./_components/SubscriptionPlane";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/DB";
import { Subscriptions } from "@/utils/Schema";
import moment from "moment";
import { useAppContext } from "@/hooks/useAppContext";
import { plans } from "@/app/(data)/SubscriptionPlans";
import { Plan } from "./_components/SubscriptionPlane";

export default function Billing() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);

  const getCreditByType = useCallback(
    (type: Plan["period"]): number => {
      switch (type) {
        case "per Week":
          return 50000;
        case "per Month":
          return 250000;
        case "per Year":
          dispatch({ type: "SET_UNLIMITED_CREDITS" });
          return Infinity;
        default:
          return 10000;
      }
    },
    [dispatch]
  );

  const handleSubscription = useCallback(async (type: Plan["period"]) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-subscription", { type });
      onSubscription(response.data.id, type);
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to create subscription. Please try again.");
      setLoading(false);
    }
  }, []);

  const onSubscription = useCallback(
    (subId: string, type: Plan["period"]) => {
      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID || "",
        subscription_id: subId,
        name: "Scriptify AI Apps",
        description: `${type} Subscription`,
        handler: async (response: any) => {
          try {
            console.log("type ", type);
            saveSubscription(response.razorpay_payment_id, type);
            dispatch({ type: "SET_SUBSCRIPTION_TYPE", payload: type });
            dispatch({
              type: "SET_TOTAL_CREDITS",
              payload: getCreditByType(type),
            });
            toast.success("Subscription activated successfully!");
          } catch (error) {
            toast.error("Error processing payment");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
        },
        theme: {
          color: "#2563eb",
        },
      };

      if (!options.key) {
        toast.error("Payment configuration error");
        setLoading(false);
        return;
      }

      if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
        setLoading(false);
        return toast.error("Some error occurred try again later");
      }
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    },
    [user, dispatch, getCreditByType]
  );

  const saveSubscription = async (paymentId: string, type: Plan["period"]) => {
    console.log(user?.primaryEmailAddress?.emailAddress, user?.fullName);

    if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) return;

    const endDate = moment()
      .add(1, type.slice(4, type.length).toLowerCase() as Period)
      .toDate();
    // console.log("endDate ", type.slice(4, type.length).toLowerCase());
    // console.log("endDate ", endDate);

    await db.insert(Subscriptions).values({
      email: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      type,
      paymentId,
      joinDate: new Date(),
      endDate,
    });
  };

  if (!isLoaded) {
    return <div>{user}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {/* <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button> */}
          <Button
            className="text-white font-bold"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Back
          </Button>
        </div>

        {/* <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Choose Your Perfect Plan
        </h1> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <SubscriptionPlan
              key={plan.title}
              plan={plan}
              currentPlan={state.subscriptionType}
              handleSubscription={handleSubscription}
              isLoading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
