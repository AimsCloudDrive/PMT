/** @jsx createElement */
import {
  ClassType,
  JSTypes,
  OptionDecoratorUsedError,
  getGlobalData,
} from "@ocean/common";
import {
  Component,
  ComponentEvents,
  ComponentProps,
  SingleRef,
  component,
  createSingleRef,
  initComponentOptions,
  option,
} from "@ocean/component";
import { createElement, render } from "@ocean/dom";
import { observer } from "@ocean/reaction";

const singleRef: SingleRef<A> = createSingleRef();

Object.assign(window, {
  getGlobalData,
  createElement,
});

@component("A", {
  events: {
    click: "null",
  },
})
class A extends Component<
  { bclass?: string; AAA?: number; class: ClassType } & ComponentProps,
  {
    click: null;
  } & ComponentEvents
> {
  @option()
  @observer()
  AAA: number | undefined = 10;

  bclass: string | undefined;

  constructor(prop: any) {
    super(prop);
    Object.assign(window, { AAA: this });
  }

  @observer()
  private declare dd: any;

  setJSX(jsx: any) {
    this.dd = jsx;
  }

  render() {
    return (
      <div class={this.getClassName()}>
        <div class={"1"}>{this.AAA}</div>
      </div>
    );
  }
}

const a = (
  <A
    $ref={singleRef}
    bclass={"bbb"}
    AAA={1}
    class={["a", "b"]}
    click={(pp) => {}}
  ></A>
);

render(a, document.getElementById("root")!);
// render2(a, document.getElementById("root")!);

Object.assign(window, { A });

// TODO: 更新属性后render的数据没变
