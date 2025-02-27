"use client";
import React, { useEffect, useState } from "react";
import Form from "../_components/Form";
import OutPut from "../_components/OutPut";
import { TEMPLATE } from "@/types/template";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/AIModel";
import { db } from "@/utils/DB";
import { AIOutput } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useAppContext } from "@/hooks/useAppContext";
import { ContextType } from "@/app/(context)/reduser";
import { ToastContainer, toast } from "react-toastify";

interface PROPS {
  params: Promise<{ "template-slug": string }>;
}

function CreateNewContent({ params }: PROPS) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const router = useRouter();
  const [templateSlug, setTemplateSlug] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | null>(
    null
  );
  const state: ContextType = useAppContext();

  useEffect(() => {
    const initialize = async () => {
      try {
        let slugResp = await params;
        let slug = slugResp["template-slug"];

        if (!slug) return;
        setTemplateSlug(slug);

        // Find the selected template directly using the resolved slug
        const template = Templates.find((item) => item.slug === slug);
        setSelectedTemplate(template || null);

        if (!template) {
          console.warn(`Template with slug '${slug}' not found.`);
        }
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    initialize();
  }, [params]);

  const generateAIContent = async (formData: any) => {
    if (!state.state.unlimited) {
      if (state && state?.state.usedCredit >= 50000) {
        toast.error("You have exceeded your daily credit limit.");
        return;
      }
    }
    if (!selectedTemplate) {
      console.error("No template selected.");
      return;
    }

    setLoading(true);

    try {
      const selectedPrompt = selectedTemplate.aiPrompt;
      const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

      const result = await chatSession.sendMessage(finalAIPrompt);
      const parsedResult = await result.response.text(); // Ensure the result is properly awaited

      setResult(parsedResult);

      state?.dispatch({
        type: "UPDATE_USED_CREDIT",
        payload: parsedResult.length,
      });
      await saveToDb(formData, selectedTemplate.slug, parsedResult);
    } catch (error) {
      toast.error("Error generating AI content");
    } finally {
      setLoading(false);
    }
  };

  const saveToDb = async (formData: any, slug: string, response: string) => {
    try {
      await db.insert(AIOutput).values({
        aiResponse: response,
        formData: formData,
        templateSlug: slug,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Anonymous",
        createdAt: moment().toISOString(),
      });
    } catch (error) {
      toast.error("Error saving to database");
      // console.error("Error saving to database:", error);
    }
  };

  if (!templateSlug) {
    return <div>Loading template...</div>;
  }

  return (
    <div className="max-sm:px-5 px-10 py-5">
      <ToastContainer />
      <Button className="text-white font-bold" onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <Form
          loading={loading}
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => generateAIContent(value)}
        />
        <div className="md:col-span-2">
          <OutPut result={result} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
