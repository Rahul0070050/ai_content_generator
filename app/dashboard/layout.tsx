import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { AppProvider } from "@/app/(context)/reduser";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <div className="bg-slate-100 h-full min-h-screen">
        <div className={`lg:w-64 lg:block hidden fixed`}>
          <SideNav />
        </div>
        <div className="lg:ml-64">
          <Header />
          {children}
        </div>
      </div>
    </AppProvider>
  );
}

export default layout;
