import { createBrowserRouter } from "react-router-dom";

import HomeRoute from "./home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />
  }
]);