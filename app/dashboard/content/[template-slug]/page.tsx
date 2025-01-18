"use client";
import React, { useState } from "react";
import Form from "../_components/Form";
import OutPut from "../_components/OutPut";
import { TEMPLATE } from "@/types/template";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/AIModel";

interface PROPS {
  params: {
    "template-slug": string;
  };
}
function CreateNewContent({ params }: PROPS) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const router = useRouter();
  const templateSlug = params["template-slug"];
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == templateSlug
  );

  const GenarateAIContent = async (formData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;

    const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
    const result = await chatSession.sendMessage(finalAIPrompt);
    setLoading(false);
    setResult(result.response.text());
    // console.log("result ", result.response);
  };

  return (
    <div className="p-10">
      <Button className="text-white font-bold" onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <Form
          loading={loading}
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenarateAIContent(value)}
        />
        <div className="col-span-2">
          <OutPut result={result} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
