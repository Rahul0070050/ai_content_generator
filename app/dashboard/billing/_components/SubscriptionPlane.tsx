import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import React from "react";

export type Period = "week" | "month" | "year";
export interface Plan {
  title: string;
  amount: string;
  period: "per Week" | "per Month" | "per Year" | "Normal";
  description: string;
  features: Array<{ title: string }>;
}

interface SubscriptionPlanProps {
  plan: Plan;
  currentPlan: string;
  handleSubscription: (type: Plan["period"]) => void;
  isLoading?: boolean;
}

export default function SubscriptionPlan({
  plan,
  currentPlan,
  handleSubscription,
  isLoading = false,
}: SubscriptionPlanProps) {
  const isNormalPlan = plan.period === "Normal";
  const isActive = currentPlan
    .toLowerCase()
    .includes(plan.title.slice(0, plan.title.length - 2).toLowerCase());

  const planStyle = `relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 bg-white p-6 flex flex-col h-full`;

  const formattedAmount = plan.amount !== "0.00" ? `₹${plan.amount}` : "";
  const formattedPeriod = plan.amount !== "0.00" ? `/${plan.period}` : "";

  return (
    <div
      className={planStyle}
      role="card"
      aria-label={`Subscription plan: ${plan.title}`}
    >
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{plan.title}</h2>
        {formattedAmount && (
          <h1 className="text-4xl font-extrabold text-gray-800">
            {formattedAmount}
            <span className="text-base font-normal text-gray-600">
              {formattedPeriod}
            </span>
          </h1>
        )}
      </div>

      {/* Description Section */}
      <p className="text-gray-700 text-sm md:text-base mb-6 text-center leading-relaxed">
        {plan.description}
      </p>

      {/* Features Section */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature.title}
              className="flex items-center gap-3 text-gray-700"
            >
              <CircleCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm md:text-base">{feature.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-6">
        <Button
          className={`w-full py-4 font-semibold text-white rounded-xl transition-colors ${
            isActive ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => handleSubscription(plan.period)}
          disabled={isLoading || isActive}
          aria-label={isActive ? "Current Plan" : "Subscribe Now"}
        >
          {isActive ? "Current Plan" : "Subscribe Now"}
        </Button>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
          Active
        </span>
      )}
    </div>
  );
}
