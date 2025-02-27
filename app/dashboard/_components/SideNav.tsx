"use client";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "../../../public/logo.svg";
import UsageTrack from "./UsageTrack";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

function SideNav() {
  const path = usePathname();
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
    <div
      className={`h-screen p-5 border bg-white ${roboto.className} relative`}
    >
      <Link href={"/dashboard"}>
        <div className="flex justify-center items-center gap-2">
          <Image src={logo} alt="logo" width={35} height={35} />
          <span className="text-2xl text-logo">Scriptify</span>
        </div>
      </Link>
      <hr className="my-6 border" />
      <div className="mt-3">
        {NavLinks.map((menuItem, index) => (
          <Link
            key={menuItem.path}
            href={menuItem.path}
            // className={`flex items-center gap-2 text-sm ${path === menuItem.path ? "text-blue" : "text-gray-500"}`}
          >
            <div
              className={`flex gap-2 mb-2 p-3 items-center hover:bg-primary-background hover:text-white rounded-lg cursor-pointer ${
                menuItem.path == path && "bg-primary-background text-white"
              }`}
            >
              <menuItem.icon className="h-6 w-6" />
              <h2 className="text-lg">{menuItem.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
