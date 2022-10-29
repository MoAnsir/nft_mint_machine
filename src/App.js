import "./App.css";
import Home from "./components/Home";
import Install from "./components/Install";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <div>{window.ethereum ? <Home /> : <Install />}</div>;
}

export default App;
