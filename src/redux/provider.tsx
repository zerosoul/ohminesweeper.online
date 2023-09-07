"use client";
import { Provider } from "react-redux";
import store from "./store";
import React, { useEffect } from "react";
import { isDarkMode } from "@/utils";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  // dark mode
  useEffect(() => {
    if (isDarkMode()) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
