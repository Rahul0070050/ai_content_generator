import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { TEMPLATE } from "@/types/template";

function TemplateList({ searchText }: any) {
  const [templateList, setTemplateList] = useState(Templates);
  useEffect(() => {
    if (searchText) {
      const filteredList = Templates.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
      setTemplateList(filteredList);
    } else {
      setTemplateList(Templates);
    }
  }, [searchText]);
  return (
    <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((template: TEMPLATE, index: number) => (
        <TemplateCard key={template.slug} {...template} />
      ))}
    </div>
  );
}

export default TemplateList;
