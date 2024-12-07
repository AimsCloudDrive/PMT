// /** @jsx createElement */
// import { createElement, render } from "@ocean/dom";
// import { App } from "./comps/App";
// import "./index.css";

// // render(<App routes={[]} />, document.getElementById("root")!);

/** @jsx createElement */

import { Component, ComponentProps, component, option } from "@ocean/component";
import { ClassType } from "@ocean/common";
import { createElement, render } from "@ocean/dom";
import { observer } from "@ocean/reaction";

@component("A")
class A extends Component<{ AAA: number; class: ClassType } & ComponentProps> {
  @option()
  @observer()
  AAA: number | undefined;

  render() {
    return <div class={this.getClassName()}>{this.AAA}</div>;
  }
}

const a = <A AAA={1} class={["a", "b"]}></A>;

render(a, document.getElementById("root")!);
