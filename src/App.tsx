/**@jsx createElement */
import { createElement, mountComponent } from "@ocean/dom";
import { Location } from "@ocean/ui";
import { App } from "@ocean/app";
import "./index.css";

const app = new App({
  routes: [],
  globalParamNames: ["dev", "route"],
});

mountComponent(app, document.getElementById("root")!);
