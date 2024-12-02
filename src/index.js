import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the App component as the root component
import "./style.css"; // Import global styles if any
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance to manage react-query's state and cache
const queryClient = new QueryClient();

// Create a root element using React 18's new createRoot method
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
