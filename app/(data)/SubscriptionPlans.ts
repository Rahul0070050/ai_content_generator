import { Plan } from "../dashboard/billing/_components/SubscriptionPlane";

export const plans: Plan[] = [
  {
    title: "Free",
    amount: "0.00",
    period: "Normal",
    description: "Get started with essential AI tools for free.",
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
    period: "per Week",
    description: "Access premium features with a weekly billing cycle.",
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
    description: "Access premium features with a monthly billing cycle.",
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
    description: "Access premium features with a yearly billing cycle.",
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
