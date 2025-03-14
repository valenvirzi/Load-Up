import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSettingsStore } from "./context/SettingsContext";

function App() {
  const { theme } = useSettingsStore();
  return (
    <div
      className={`relative flex min-h-screen flex-col dark:bg-stone-900 dark:text-white ${theme}`}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
