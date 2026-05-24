import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Staff Portal</h1>
      <p>Frontend is running 🚀</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);