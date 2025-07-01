import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
  <div>
    <h1>Rapid CRM Admin</h1>
    <p>React loaded from plugin root.</p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("rapid-crm-root"));
root.render(<App />);
