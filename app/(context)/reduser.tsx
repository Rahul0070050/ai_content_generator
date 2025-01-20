"use client";
import React, { createContext, useReducer } from "react";

interface STATE {
  usedCredit: number;
  user: any;
}

// Define initial state
const initialState: STATE = {
  usedCredit: 0,
  user: null,
};

// Define the action types
type ActionType =
  | { type: "UPDATE_USED_CREDIT"; payload: number }
  | { type: "SET_USED_CREDIT"; payload: number }
  | { type: "SET_USER"; payload: string };

// Define the context value type
export interface ContextType {
  state: STATE;
  dispatch: React.Dispatch<ActionType>;
}

// Reducer function
const reducer = (state: STATE, action: ActionType) => {
  switch (action.type) {
    case "SET_USED_CREDIT":
      console.log("inside dispath", action.payload);
      return { ...state, usedCredit: action.payload };
    case "UPDATE_USED_CREDIT":
      return { ...state, usedCredit: state.usedCredit + action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create the context
export const AppContext = createContext<ContextType | undefined>(undefined);

// 2. Create a Context Provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
