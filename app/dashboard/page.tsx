"use client";
import { useState } from "react";
import Search from "./_components/Search";
import TemplateList from "./_components/TemplateList";

function Dashboard() {
  const [searchText, setSearchText] = useState<string>();
  return (
    <div>
      <Search onSearchInput={(value: string) => setSearchText(value)} />
      <TemplateList searchText={searchText} />
    </div>
  );
}

export default Dashboard;
