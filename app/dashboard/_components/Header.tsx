"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  const { state } = useAppContext();
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-5 shadow-sm border-b-2 flex-wrap bg-white">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-md">
        <Search />
        <input
          className="outline-none bg-background"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
      </div>
      <div className="flex gap-5">
        <h2 className="bg-primary-background px-5 py-3 rounded-full font-semibold text-white cursor-pointer max-sm:hidden">
          {state.subscriptionType != "basic"
            ? "🎉 Welcome to Premium!"
            : "Unlock exclusive benefits for just ₹20.00/week! 🎉"}
        </h2>
        <div>
          <UserButton
            afterSignOutUrl="dashboard/"
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                },
                userButtonTrigger: {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
              },
            }}
          />
          {/* <h1>{user?.primaryEmailAddress?.emailAddress}</h1> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
