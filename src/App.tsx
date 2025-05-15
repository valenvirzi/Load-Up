import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useSettingsStore } from "./context/SettingsContext";

function App() {
  const { theme } = useSettingsStore();
  return (
    <div
      className={`relative flex min-h-svh flex-col pb-24 dark:bg-stone-900 dark:text-white ${theme}`}
    >
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
