/**@jsx createElement */
import { createElement, mountComponent } from "@ocean/dom";
import { App } from "@ocean/app";
import "./index.css";

Object.assign(window, { createElement });

const app = new App({
  routes: [
    {
      path: "/app",
      view: (router) => <div>app</div>,
      nav: "app",
      children: [
        {
          path: "/next",
          view: (router) => <div>app/next</div>,
          nav: "next",
          children: [],
        },
      ],
    },
  ],
  globalParamNames: ["dev", "route"],
});

mountComponent(app, document.getElementById("root")!);
