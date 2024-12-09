/** @jsx createElement */
import {
  ClassType,
  JSTypes,
  defineProperty,
  getGlobalData,
  parseClass,
  parseStyle,
  Event,
  COMPONENT_OPTION_KEY,
  OcPromise,
} from "@ocean/common";
import {
  Component,
  ComponentProps,
  IRef,
  SingleRef,
  createSingleRef,
  initComponentOptions,
  isComponent,
  // option,
} from "@ocean/component";
import { mountComponent, createElement, render } from "@ocean/dom";
import { createReaction, observer } from "@ocean/reaction";

const singleRef: SingleRef<A> = createSingleRef();

Object.assign(window, {
  createElement,
  getGlobalData,
});

function render2(element: any, container: HTMLElement) {
  let dom: any = void 0;
  let classInst: Component<any> | undefined = void 0;
  const cb = () => {
    // 通过配置生成元素
    dom = createDom(element);
    if (classInst) {
      // 类组件实例附着在元素上
      defineProperty(dom, "$owner", 7, classInst);
      defineProperty(dom, "$parent", 7, ((classInst || {}) as any)["$parent"]);
      // 根元素附着在类组件实例上
      classInst.el = dom;
      mountComponent(classInst, container);
    } else {
      container.appendChild(dom);
    }
    // 渲染子元素
    if (element.props.children && element.props.children.length > 0) {
      for (const c of element.props.children) {
        render2(c, dom);
      }
    }
  };
  if (typeof element.type === "function") {
    const { children, ...props } = element.props;
    if (isComponent(element.type)) {
      // 类组件
      const _component = getGlobalData("@ocean/component");
      const _rendering = _component.rendering;
      const inst: Component<any, any> = (classInst = new element.type(props));
      // 处理传递的子元素
      if (children && children.length > 0) {
        const c = children[0];
        if (c.type === "TEXT_NODE" && typeof c.props.nodeValue === "function") {
          inst.setJSX(c.props.nodeValue);
        } else {
          inst.setJSX(children.length > 1 ? children : children[0]);
        }
      }
      // 监听自定义的事件
      const _events: Record<
        string,
        {
          type: JSTypes;
          _on?: (event: any, type: string, slef: Event<any>) => void;
        }
      > = inst[_component.componentEventsKey];
      if (_events) {
        Object.entries(_events).forEach(([k, event]) => {
          // 原来已经绑定 则解绑
          if (event._on) {
            inst.un(k, event._on);
            event._on = undefined;
          }
          // 绑定新事件
          const on = props[k];
          if (on) {
            inst.on(k, on);
            event._on = on;
          }
        });
      }

      inst.$owner = _rendering;
      inst.$parent = _rendering;
      createReaction(() => {
        try {
          _component.rendering = inst;
          element = inst.render();
          cb();
          // cb执行完，真实生成的dom已经存在，将类组件实例附着在dom上
          if (props.$ref) {
            const refs: IRef<any>[] = [props.$ref].flat();
            refs.forEach((ref) => ref.set(inst));
          }
          inst.rendered();
        } finally {
          _component.rendering = _rendering;
        }
      });
    } else {
      // 函数组件
      createReaction(() => {
        element = element.type(props);
        cb();
        // 函数组件ref绑定生成的元素
        if (props.$ref) {
          const refs: IRef<any>[] = [element.props.$ref].flat();
          refs.forEach((ref) => ref.set(dom));
        }
      });
    }
  } else {
    // 普通元素
    cb();
    if (element.props.$ref) {
      const refs: IRef<any>[] = [element.props.$ref].flat();
      refs.forEach((ref) => ref.set(dom));
    }
  }
  return dom;
}

function createDom(element: any) {
  const {
    children,
    class: _class,
    style,
    $key,
    $ref,
    context,
    ...props
  } = element.props;
  // 创建元素
  const dom =
    element.type === "TEXT_NODE"
      ? document.createTextNode("")
      : document.createElement(element.type as string);
  // 给元素赋属性值
  // 处理class
  if (_class) {
    props.className = `${parseClass(_class)} ${props.className || ""}`.trim();
  }
  // 处理style
  if (style) {
    Object.assign(props, { style: parseStyle(style) });
  }
  Object.assign(dom, props);
  return dom;
}

function component(option?: any) {
  return function (ctor: any, context: ClassDecoratorContext) {
    if (!context.name || context.kind !== "class") return; // 非类装饰器
    const { componentKeyMap, componentKeyWord, componentEventsKey } =
      getGlobalData("@ocean/component");
    const isExist = componentKeyMap.has(context.name);
    if (isExist) throw Error(`Component '${name}' is already exist.`);
    defineProperty(ctor.prototype, componentKeyWord, 0, context.name);
    if (option?.events) {
      const bingdingEvents = Object.entries(option.events).reduce(
        (_bingdingEvents, [ek, type]) =>
          Object.assign(_bingdingEvents, { [ek]: { type, _on: undefined } }),
        {}
      );
      defineProperty(ctor, componentEventsKey, 0, bingdingEvents);
    }

    componentKeyMap.set(context.name, ctor);
  };
}

function option(type?: JSTypes) {
  return (ctor: any, { kind, name }: ClassFieldDecoratorContext) => {
    // const { componentKeyWord } = getGlobalData("@ocean/component");
    // const isComp = ctor[componentKeyWord];
    // TODO 必须在component中才能使用@option
    // if (!isComp) {
    //   console.error(`the decorator of 'option' should in a component`);
    //   return;
    // }
    const OPTIONS = initComponentOptions(ctor);
    OPTIONS[name] = {
      name,
      type,
    };
  };
}

@component({})
class A extends Component<
  { bclass?: string; AAA?: number; class: ClassType } & ComponentProps
> {
  @option()
  AAA: number | undefined;
  @option()
  bclass: string | undefined;

  setProps(
    props: Partial<
      {
        bclass?: string | undefined;
        AAA?: number | undefined;
        class: ClassType;
      } & ComponentProps
    >
  ): void {
    const options = this._getOptions();
    Object.entries(props).forEach(([k, v]: [any, any]) => {
      if (Object.hasOwnProperty.call(options, k)) {
        Reflect.set(this, k, v);
      }
    });
  }
  private _getOptions() {
    const OPTIONS = Reflect.get(this, COMPONENT_OPTION_KEY) || {};
    return OPTIONS as any;
  }

  constructor(prop: any) {
    super(prop);
    Object.assign(window, { A: this });
  }

  private declare dd: any;

  setJSX(jsx: any) {
    this.dd = jsx;
  }

  render() {
    return (
      <div class={this.getClassName()}>
        <div class={"1"}></div>
        {this.dd(this)}
      </div>
    );
  }
}

@component({})
class B extends Component<ComponentProps> {
  render() {
    return <div class={this.getClassName()}>B</div>;
  }
}

const a = (
  <A $ref={singleRef} bclass={"bbb"} AAA={1} class={["a", "b"]}>
    {(a: A) => {
      return <B class={a.bclass}></B>;
    }}
  </A>
);

// render(a, document.getElementById("root")!);
render2(a, document.getElementById("root")!);
