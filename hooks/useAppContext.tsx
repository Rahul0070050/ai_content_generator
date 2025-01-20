import { AppContext } from "@/app/(context)/reduser";
import { useContext } from "react";

export const useAppContext = () => {
  return useContext(AppContext);
};
