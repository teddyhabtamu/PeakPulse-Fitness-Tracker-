import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const registerSW = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => {
          console.log("Service Worker registered:", reg.scope);
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });
    });
  }
};

registerSW();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
