import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Settings() {
  return (
    <div className="flex justify-center items-center p-10 max-sm:p-5">
      <UserProfile
        appearance={{
          elements: {
            cardBox: {
              boxShadow: "none",
            },
          },
        }}
      />
    </div>
  );
}

export default Settings;
