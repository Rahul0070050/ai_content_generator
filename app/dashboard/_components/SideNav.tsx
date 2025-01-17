import Image from "next/image";

import { Roboto } from "next/font/google";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

function SideNav() {
  const NavLinks = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className={`h-screen p-5 border ${roboto.className}`}>
      <div className="flex justify-center items-center gap-2">
        <Image src={"logo.svg"} alt="logo" width={35} height={35} />
        <span className="text-2xl text-logo">Scriptify</span>
      </div>
      <div className="mt-10">
        {NavLinks.map((menuItem, index) => (
          <div className="flex gap-2 mb-2 p-3 items-center hover:bg-primary hover:text-white rounded-lg cursor-pointer">
            <menuItem.icon />
            <h1>{menuItem.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
