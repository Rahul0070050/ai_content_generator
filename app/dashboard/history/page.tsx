"use client";
import { Button } from "@/components/ui/button";
import { TEMPLATE } from "@/types/template";
import { db } from "@/utils/DB";
import { AIOutput } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export interface HISTORY {
  templateSlug: string;
  id: number;
  formData: string;
  aiResponse: string;
  createdBy: string | null;
  createdAt: string | null;
}
function History() {
  const router = useRouter();
  const { user } = useUser();
  const [historyData, setHistoryData] = useState<HISTORY[]>([]);

  useEffect(() => {
    async function getHistory() {
      const result = await db
        .select()
        .from(AIOutput)
        .where(
          eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        );
      setHistoryData(result);
      GetTotalUsage(result);
    }
    getHistory();
  }, [user]);

  function GetTotalUsage(result: HISTORY[]) {
    let total = 0;
    result.forEach((item) => {
      total += item.aiResponse.length;
    });

    // console.log(total);
  }

  function copyText(aiResponse: string) {
    navigator.clipboard.writeText(aiResponse);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
    });
  }

  return (
    <div className="p-10">
      <ToastContainer />
      <Button className="text-white font-bold" onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>
      <div className="p-5 bg-white mt-5">
        <h2 className="font-bold text-2xl mb-1">History</h2>
        <p className="text-gray-500 text-sm">
          Search your previously genarated AI content
        </p>
        <div className="overflow-x-auto">
          <table className="mt-5 w-full">
            <thead className="bg-slate-200 w-full">
              <tr className="w-full border">
                {/* <td className="p-4 font-bold">ID</td> */}
                <td className="p-4 font-bold">TEMPLATE</td>
                <td className="p-4 font-bold">AI RESULT</td>
                <td className="p-4 font-bold">DATE</td>
                <td className="p-4 font-bold">WORDS</td>
                <td className="p-4 font-bold">COPY</td>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr>
                  {/* <td className="p-4">{item.id}</td> */}
                  <td className="border p-4">{item.templateSlug}</td>
                  <td className="border p-4 w-[30%] text-wrap">
                    {item.aiResponse.slice(0, 150)}
                  </td>
                  <td className="border p-4">{item.createdAt}</td>
                  <td className="border p-4">{item.aiResponse.length}</td>
                  <td className="border p-4 cursor-pointer">
                    <Button className="border bg-slate-100">
                      <Copy onClick={() => copyText(item.aiResponse)} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
