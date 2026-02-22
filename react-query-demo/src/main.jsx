import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* ...inside provider... */
<>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // how long data is considered "fresh"
      staleTime: 1000 * 30, // 30s
      // keep cache for a while even if component unmounts
      gcTime: 1000 * 60 * 5, // 5 mins (formerly cacheTime)
      refetchOnWindowFocus: false, // nicer UX for demos
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
