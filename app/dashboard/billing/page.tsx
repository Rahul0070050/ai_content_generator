"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeInfo, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import SubscriptionPlane, { PLAN } from "./_components/SubscriptionPlane";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Subscriptions } from "@/utils/Schema";
import { db } from "@/utils/DB";
import moment from "moment";
import { useAppContext } from "@/hooks/useAppContext";

function Billing() {
  const plans: PLAN[] = [
    {
      title: "Free",
      amount: "0.00",
      period: "per Month",
      desctiption: "Get started with essential AI tools for free.",
      features: [
        {
          title: "10,000 credits",
        },
        {
          title: "Community support",
        },
      ],
    },
    {
      title: "Weekly",
      amount: "20.00",
      period: "per week",
      desctiption: "Access premium features with a weekly billing cycle.",
      features: [
        {
          title: "50,000 credits",
        },
        {
          title: "Priority email support",
        },
        {
          title: "Community support",
        },
      ],
    },
    {
      title: "Monthly",
      amount: "40.00",
      period: "per Month",
      desctiption: "Access premium features with a monthly billing cycle.",
      features: [
        {
          title: "250,000 credits",
        },
        {
          title: "Chat and email support",
        },
        {
          title: "Community support",
        },
      ],
    },
    {
      title: "Yearly",
      amount: "450.00",
      period: "per Year",
      desctiption: "Access premium features with a yearly billing cycle.",
      features: [
        {
          title: "Unlimited credits",
        },
        {
          title: "Bulk operations",
        },
        {
          title: "24/7 premium support",
        },
        {
          title: "Community support",
        },
      ],
    },
  ];

  type PERIOD = "week" | "month" | "year";
  const router = useRouter();
  const { state } = useAppContext();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [currentPlane, setCurrentPlan] = useState("");

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
