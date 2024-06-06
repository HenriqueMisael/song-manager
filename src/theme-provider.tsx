import type * as React from "react";
import { useSelector } from "react-redux";
import { Colors } from "@blueprintjs/core";

import { isDarkTheme } from "./store/session/selectors.ts";

const ThemeProvider = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const darkMode = useSelector(isDarkTheme);
  const background = darkMode ? Colors.BLACK : Colors.WHITE;

  return (
    <div
      className={darkMode ? "bp5-dark" : ""}
      style={{ width: "100vw", height: "100vh", background }}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;