/** @jsx createElement */
import { createElement, render } from "@ocean/dom";
import { App } from "./comps/App";
import "./index.css";

render(<App routes={[]} />, document.getElementById("root")!);
