import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import AddVideo from "./AddVideo";

function App() {
  return (
    <div className="App">
      <h1>Capture image from video and save images </h1>
      <AddVideo />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
