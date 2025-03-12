import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import CalculatorPage from "./pages/CalculatorPage.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";
import TimerPage from "./pages/TimerPage.tsx";
import ExercisesPage from "./pages/ExercisesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/inventory", element: <InventoryPage /> },
      { path: "/exercises", element: <ExercisesPage /> },
      { path: "/calculator", element: <CalculatorPage /> },
      { path: "/timer", element: <TimerPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
