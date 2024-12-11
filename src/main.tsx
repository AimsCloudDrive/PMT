/** @jsx createElement */
import { ClassType, getGlobalData } from "@ocean/common";
import {
  Component,
  ComponentEvents,
  ComponentProps,
  SingleRef,
  component,
  createSingleRef,
  option,
} from "@ocean/component";
import { createElement, render } from "@ocean/dom";
import { observer } from "@ocean/reaction";
import "./index.css";

const singleRef: SingleRef<A> = createSingleRef();

Object.assign(window, {
  getGlobalData,
  createElement,
});

@component("A", {
  events: {
    click: "object",
  },
})
class A extends Component<
  { bclass?: string; AAA?: number; class: ClassType } & ComponentProps,
  {
    click: { app: string };
  } & ComponentEvents
> {
  @option()
  @observer()
  AAA!: number;

  bclass: string | undefined;

  constructor(prop: any) {
    super(prop);
    Object.assign(window, { AAA: this });
  }

  @observer()
  private declare dd: any;

  render() {
    return (
      <div
        class={[this.getClassName(), "AAA"]}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        }}
      >
        <div
          class={"1"}
          style={{
            color: "red",
            fontSize: "2rem",
            backgroundColor: "yellow",
            width: "100px",
            height: "100px",
            // 可点击
            cursor: "pointer",
            "pointer-events": "all",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
          }}
          onclick={() => {
            this.AAA = this.AAA + 1;
            this.emit("click", { app: "AAA" });
          }}
        >
          {this.AAA}
        </div>
      </div>
    );
  }
}

@component("B")
class B extends Component {
  @option()
  @observer()
  BBB!: number;
  @observer()
  content!: any;
  render() {
    return (
      <div class={[this.getClassName(), "BBB"]}>
        {this.BBB}
        <div class={"content"}>{this.content}</div>
      </div>
    );
  }
  setJSX(jsx): void {
    this.content = jsx;
  }
}

const a = (
  <B>
    <A
      click={({ app }) => {
        console.error(app);
      }}
      $ref={singleRef}
      bclass={"bbb"}
      AAA={2}
      class={["a", "b"]}
    ></A>
  </B>
);

render(a, document.getElementById("root")!);
// render2(a, document.getElementById("root")!);

Object.assign(window, { A });

// TODO: 更新属性后render的数据没变 resolved
