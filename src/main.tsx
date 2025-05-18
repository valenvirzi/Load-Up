import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import CalculatorPage from "./pages/CalculatorPage.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <WelcomePage /> },
      { path: "/inventory", element: <InventoryPage /> },
      {
        path: "/exercises",
        element: <ExercisesPage />,
        children: [
          { path: "/exercises/:exerciseName", element: <ExercisePage /> },
        ],
      },
      { path: "/calculator", element: <CalculatorPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>,
);
