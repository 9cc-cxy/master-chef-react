import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./components/routing/Session";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Session>
        <App />
      </Session>
    </Provider>
  </QueryClientProvider>
);
