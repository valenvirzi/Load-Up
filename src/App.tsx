import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // TODO: https://chatgpt.com/c/67b78c78-349c-8007-9909-16819e88bdda

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
