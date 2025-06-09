import { Outlet } from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import { useSettingsStore } from "./context/SettingsContext";

function App() {
  const { theme } = useSettingsStore();
  return (
    <div
      className={`flex min-h-lvh max-w-screen flex-col overflow-hidden pb-24 dark:bg-stone-900 dark:text-white ${theme}`}
    >
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
