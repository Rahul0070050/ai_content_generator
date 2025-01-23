"use client";
import React, { createContext, useReducer } from "react";

interface STATE {
  usedCredit: number;
  totalCreadits: number;
  subscriptionType: string;
  unlimited: boolean;
  user: any;
}

// Define initial state
const initialState: STATE = {
  usedCredit: 0,
  totalCreadits: 10000,
  subscriptionType: "basic",
  unlimited: false,
  user: null,
};

// Define the action types
type ActionType =
  | { type: "UPDATE_USED_CREDIT"; payload: number }
  | { type: "SET_USED_CREDIT"; payload: number }
  | { type: "SET_TOTAL_CREDITS"; payload: number }
  | { type: "SET_SUBSCRIPTION_TYPE"; payload: string }
  | { type: "SET_UNLIMITED_CREDITS" };

// Define the context value type
export interface ContextType {
  state: STATE;
  dispatch: React.Dispatch<ActionType>;
}

// Reducer function
const reducer = (state: STATE, action: ActionType) => {
  switch (action.type) {
    case "SET_USED_CREDIT":
      return {
        ...state,
        usedCredit: action.payload,
      };
    case "UPDATE_USED_CREDIT":
      return {
        ...state,
        usedCredit: state.usedCredit + action.payload,
      };
    case "SET_TOTAL_CREDITS":
      return { ...state, totalCreadits: action.payload };
    case "SET_UNLIMITED_CREDITS":
      return { ...state, unlimited: true };
    case "SET_SUBSCRIPTION_TYPE":
      if (action.payload == "year") {
        return { ...state, subscriptionType: action.payload, unlimited: false };
      }
      return { ...state, subscriptionType: action.payload };
    default:
      return state;
  }
};

// Create the context
export const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

// 2. Create a Context Provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
