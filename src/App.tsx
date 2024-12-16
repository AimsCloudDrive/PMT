/**@jsx createElement */
import { createElement, mountComponent } from "@ocean/dom";
import { App } from "@ocean/app";
import "./index.css";

const app = new App({
  routes: [
    {
      path: "/app",
      view: (router) => <div>{router.path}</div>,
      nav: "app",
      children: [],
    },
  ],
  globalParamNames: ["dev", "route"],
});

mountComponent(app, document.getElementById("root")!);
