/** @jsx createElement */
import { Component, ComponentProps, option } from "@ocean/component";
import { JSX } from "react-dom";
import { observer } from "@ocean/reaction";
import { OcPromise } from "@ocean/common";
import { createElement } from "@ocean/dom";
declare global {
  namespace Component {
    interface Context {
      router: Router;
    }
  }
}

type Funcable<T extends any, P extends any[] = []> = T | ((...p: P) => T);

type Nav = string | Array<string>;

type Route = {
  nav?: Funcable<Nav | [Nav, OcPromise<Nav>], [Router]>;
  path: string;
  view?: (router: Router) => any;
  children?: Array<Route>;
};

type RouteMatch = {
  matched: Route[];
  route: Route;
};

type RouterProps = ComponentProps & {
  routes: Array<Route>;
  notMatchPage?: Funcable<JSX.Element>;
};

export class Router extends Component<RouterProps> {
  declare path: string;

  @option()
  @observer()
  declare routes: Array<Route>;
  @option()
  @observer()
  declare notMatchPage: Funcable<JSX.Element>;

  @observer()
  declare params: Record<string, any>;

  @observer()
  declare postParams: Record<string, any>;

  @observer()
  declare current: RouteMatch;

  @observer()
  declare history: Array<RouteMatch>;

  init(): void {
    this.history = new Array();
  }

  get location() {
    return this.getContext("location");
  }

  match(path: string) {}

  render() {
    const {
      view = typeof this.notMatchPage === "function"
        ? this.notMatchPage
        : this.notMatchPage
        ? () => this.notMatchPage
        : () => <div />,
    } = this.current.route || {};
    return <div className="router">{view(this)}</div>;
  }
  jump(link: string, params?: {}, postParams?: {}, overrideHash?: {}) {
    return this.location?.jump(link, params, postParams, overrideHash);
  }
}
