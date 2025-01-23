import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { features } from "process";
import React from "react";

export interface PLAN {
  title: string;
  amount: string;
  period: string;
  desctiption: string;
  features: {
    title: string;
  }[];
}
interface PROPS {
  plan: PLAN;
  currentPlane: string;
  handleSubscription: any;
}
function SubscriptionPlane({ plan, handleSubscription, currentPlane }: PROPS) {
  return (
    <div className="shadow-md rounded-xl hover:scale-105 transition-all grid-cols-1 p-5 border bg-white h-fit">
      <h1 className="text-4xl font-bold my-3 text-center">
        &#8377; {plan.amount}/{plan.title}
      </h1>
      <p className="text-slate-500 my-3">{plan.desctiption}</p>
      <Button
        className="text-white font-bold text-lg w-full p-5 my-1 rounded-md"
        onClick={() =>
          handleSubscription(plan.title.slice(0, -2).toLocaleLowerCase())
        }
      >
        {plan.title.toLowerCase().includes(currentPlane)
          ? "Active Plan"
          : "Scbscribe"}
      </Button>
      <hr className="border border-3 my-5" />
      <ul className="px-5 font-semibold leading-10">
        {plan.features.map((featur) => (
          <li className="flex items-center gap-2" key={featur.title}>
            <CircleCheck className="text-blue-500 w-5 h-5" />
            {featur.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionPlane;
