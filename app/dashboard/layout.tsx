import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-100 h-screen">
      <div className={`lg:w-64 lg:block hidden fixed`}>
        <SideNav />
      </div>
      <div className="lg:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;
