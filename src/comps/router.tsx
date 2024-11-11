import { Component, ComponentProps, option } from "@ocean/component";
import { observer } from "@ocean/reaction";
import { OcPromise } from "@ocean/promise";
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
};

type RouterProps = ComponentProps & {
  routes: string;
};

export class Router extends Component<RouterProps> {
  declare path: string;

  @observer()
  declare params: Record<string, any>;

  @observer()
  declare postParams: Record<string, any>;

  @observer()
  declare current: any;

  get location() {
    return this.getContext("location");
  }

  match(path: string) {}

  render() {
    return <div className="router"></div>;
  }
  jump(link: string, params?: {}, postParams?: {}, overrideHash?: {}) {
    return this.location?.jump(link, params, postParams, overrideHash);
  }
}
