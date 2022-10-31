import "./App.css";
import Home from "./components/Home";
import Install from "./components/Install";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";// Dont use this, use below
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div>
      {window.ethereum ? (
        <QueryClientProvider client={queryClient}>
          <Home />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      ) : (
        <Install />
      )}
    </div>
  );
}

export default App;
