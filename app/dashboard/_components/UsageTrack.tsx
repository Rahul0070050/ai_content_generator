import { Button } from "@/components/ui/button";
import { db } from "@/utils/DB";
import { AIOutput, Subscriptions } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq, gt, gte, lt, lte } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { useAppContext } from "@/hooks/useAppContext";
import { ContextType } from "@/app/(context)/reduser";
import moment from "moment";

function UsageTrack() {
  const { user } = useUser();
  const state: ContextType = useAppContext();
  const [creditUsed, setCreditUsed] = useState(0);
  const [totalCreadits, setTotalCreadits] = useState(10000);
  const [isPremiumMember, setIsPremiumMember] = useState(false);

  useEffect(() => {
    getSubscription();
    // db.delete(Subscriptions)
    //   .where(
    //     eq(Subscriptions.email, user?.primaryEmailAddress?.toString() || "")
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, [user]);

  async function getAIResponseByDate(date: Date) {
    const startDate = moment(date).toISOString();
    const result = await db
      .select()
      .from(AIOutput)
      .where(
        and(
          eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ""),
          gte(AIOutput.createdAt, startDate)
        )
      );

    GetTotalUsage(result);
  }

  async function getSubscription() {
    const result = await db
      .select()
      .from(Subscriptions)
      .where(
        and(
          eq(
            Subscriptions.email,
            user?.primaryEmailAddress?.emailAddress || ""
          ),
          gte(Subscriptions.endDate, moment().toDate())
        )
      )
      .orderBy(desc(Subscriptions.id))
      .limit(1);

    let totalCredits = 10000;
    let subscriptionType = "Normal";

    if (result.length > 0) {
      const subscription = result[0];
      console.log("subscription ", subscription);
      subscriptionType = subscription.type;
      if (subscription.type == "per Week") {
        totalCredits = 50000;
      } else if (subscription.type == "per Month") {
        totalCredits = 250000;
      } else if (subscription.type == "per Year") {
        state.dispatch({
          type: "SET_UNLIMITED_CREDITS",
        });
        setIsPremiumMember(true);
      }
      setTotalCreadits(totalCredits);
      getAIResponseByDate(subscription.joinDate);
    } else {
      const endDateDate = moment().add(1, "week").toDate();
      getAIResponseByDate(endDateDate);
    }
    state.dispatch({
      type: "SET_SUBSCRIPTION_TYPE",
      payload: subscriptionType,
    });
    state.dispatch({
      type: "SET_TOTAL_CREDITS",
      payload: totalCredits,
    });
  }

  useEffect(() => {}, [state.state.usedCredit, state.state.totalCreadits]);

  function GetTotalUsage(result: HISTORY[]) {
    let totalUsedCreadits = result.reduce(
      (prev, current) => prev + current.aiResponse.length,
      0
    );

    // console.log("final totalUsedCreadits ", totalUsedCreadits);
    setCreditUsed(totalUsedCreadits);
    state.dispatch({
      type: "SET_USED_CREDIT",
      payload: totalUsedCreadits,
    });
  }
  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-bold">Creadits</h2>
        {!isPremiumMember && (
          <>
            <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
              <div
                className="h-2 bg-white rounded-full"
                style={{
                  width: state
                    ? `${
                        (state.state.usedCredit /
                          state.state.totalCreadits) *
                        100
                      }%`
                    : "0%",
                }}
              ></div>
            </div>
            <h2 className="my-2 text-sm">
              {state.state.usedCredit || 0}/{state.state.totalCreadits}{" "}
              Creadit used
            </h2>
          </>
        )}
        {isPremiumMember && (
          <h2 className="my-2 text-lg text-center">Unlimited Credits 🎉</h2>
        )}
      </div>
      <Button className="text-white w-full my-3 font-semibold">Upgread</Button>
    </div>
  );
}

export default UsageTrack;
