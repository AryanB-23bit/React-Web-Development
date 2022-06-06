import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import generateRandomColor from "./utils/generateRandomColor";

const DATA = [
    {checked: false, id: "colorCard1", color: generateRandomColor()},
    {checked: false, id: "colorCard2", color: generateRandomColor()},
    {checked: false, id: "colorCard3", color: generateRandomColor()},
    {checked: false, id: "colorCard4", color: generateRandomColor()},
    {checked: false, id: "colorCard5", color: generateRandomColor()},

]

ReactDOM.render(
  // <React.StrictMode>
  <App
    data = {DATA}
  />,
  // </React.StrictMode>
  document.getElementById("root")
);
