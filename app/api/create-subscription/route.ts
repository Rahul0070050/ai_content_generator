import { NextResponse } from "next/server";
import Razorpay from "razorpay";

interface SubscriptionType {
  plan: string;
}
export async function POST(req: Request, res: Response) {
  if (req.method === "POST") {
    const { type } = await req.json();
    let plan_id = process.env.NEXT_PUBLIC_RAZORPAY_WEEKLEY_PLAN;
    if (type == "week") {
      plan_id = process.env.NEXT_PUBLIC_RAZORPAY_WEEKLEY_PLAN;
    } else if (type == "month") {
      plan_id = process.env.NEXT_PUBLIC_RAZORPAY_MONTHLEY_PLAN;
    } else if (type == "month") {
      plan_id = process.env.NEXT_PUBLIC_RAZORPAY_YEARLEY_PLAN;
    }

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_KEY_ID || "",
      key_secret: process.env.NEXT_PUBLIC_KEY_SECRET || "",
    });

    const result = await instance.subscriptions.create({
      plan_id: plan_id || "",
      customer_notify: 1,
      quantity: 1,
      total_count: 1,
      addons: [],
      notes: {},
    });

    return NextResponse.json(result);
  }
}

// NEXT_PUBLIC_RAZORPAY_WEEKLEY_PLAN
// NEXT_PUBLIC_RAZORPAY_MONTHLEY_PLAN
// NEXT_PUBLIC_RAZORPAY_YEARLEY_PLAN
