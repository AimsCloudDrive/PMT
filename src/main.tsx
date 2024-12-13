import { mountComponent } from "@ocean/dom";
import { App } from "./comps/App";
import "./index.css";

const app = new App({
  routes: [],
});

mountComponent(app, document.getElementById("root")!);
