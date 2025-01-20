"use client";
import { TEMPLATE } from "@/types/template";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE | null;
  userFormInput: any;
  loading: boolean;
}
function Form({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    userFormInput(formData);
  }

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      {/* @ts-ignore */}
      <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
      <h2 className="font-bold text-2xl mb-2 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
      <form className="mt-6" onSubmit={handleSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={item.field} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold" htmlFor="">
              {item.label}
            </label>
            {item.field == "input" ? (
              <Input
                className="border-gray-400"
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : (
              <Textarea
                className="border-gray-400"
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <Button className="w-full py-6 font-bold text-white" disabled={loading}>
          {loading && <Loader2Icon className="animate-spin" />}
          Genarate Content
        </Button>
      </form>
    </div>
  );
}

export default Form;
