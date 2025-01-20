import { Button } from "@/components/ui/button";
import { db } from "@/utils/DB";
import { AIOutput } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { useAppContext } from "@/hooks/useAppContext";
import { ContextType } from "@/app/(context)/reduser";

function UsageTrack() {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const { user } = useUser();
  const state: ContextType | undefined = useAppContext();
  useEffect(() => {
    async function getHistory() {
      const result = await db
        .select()
        .from(AIOutput)
        .where(
          eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        );
      GetTotalUsage(result);
    }
    getHistory();
  }, [user]);

  function GetTotalUsage(result: HISTORY[]) {
    let total = 0;
    result.forEach((item) => {
      total += item.aiResponse.length;
    });

    console.log("before dispath called");

    state?.dispatch({
      type: "SET_USED_CREDIT",
      payload: total,
    });
    setTotalUsage(total);
  }
  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-bold">Creadits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: state
                ? `${(state?.state?.usedCredit / 50000) * 100}%`
                : "0%",
            }}
          ></div>
        </div>
        <h2 className="my-2 text-sm">
          {state?.state.usedCredit || 0}/50,000 Creadit used
        </h2>
      </div>
      <Button className="text-white w-full my-3 font-semibold">Upgread</Button>
    </div>
  );
}

export default UsageTrack;
