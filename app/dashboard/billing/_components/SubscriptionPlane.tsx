import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import React from "react";

export type Period = "week" | "month" | "year";
export interface Plan {
  title: string;
  amount: string;
  period: "per Week" | "per Month" | "per Year";
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
  const isActive = plan.title.toLowerCase().includes(currentPlan.toLowerCase());

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-200 bg-white p-6 flex flex-col h-full">
      {/* Plan Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          <span className="text-2xl align-top">₹</span>
          {plan.amount}
          <span className="text-lg font-normal text-gray-500">
            /{plan.period}
          </span>
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {plan.description}
        </p>
      </div>

      {/* Subscription Button */}
      <Button
        className={`w-full py-3 mt-4 font-semibold text-white rounded-lg transition-colors ${
          isActive
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={() => handleSubscription(plan.period)}
        disabled={isLoading || isActive}
      >
        {isActive ? "Current Plan" : "Subscribe Now"}
      </Button>

      {/* Features List */}
      <div className="mt-6 border-t pt-6 flex-grow">
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li
              key={feature.title}
              className="flex items-start gap-3 text-gray-700"
            >
              <CircleCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <span className="text-sm md:text-base">{feature.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Active Plan Badge */}
      {isActive && (
        <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Active
        </span>
      )}
    </div>
  );
}
