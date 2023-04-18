//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/styles.scss";

//import your own components
import Routes from "./routes";

//render your react application
ReactDOM.render(<Routes />, document.querySelector("#app"));
