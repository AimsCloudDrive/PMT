/** @jsx createElement */

import { Component, ComponentProps, component, option } from "@ocean/component";
import { createElement } from "@ocean/dom";
import { observer } from "@ocean/reaction";
declare global {
  namespace Component {
    interface Context {
      location: Location;
    }
  }
}

type LocationProps = ComponentProps & {
  url: string;
};

@component("location")
export class Location extends Component<LocationProps> {
  @option("string")
  declare url: {};

  @option("undefined")
  @observer()
  declare globalParamNames: Array<string>;

  @observer()
  declare params: Record<string, any>;

  @observer()
  declare postParams: Record<string, any>;

  render() {
    return <div class="location"></div>;
  }
  jump(link: string, params?: {}, postParams?: {}, overrideHash?: {}) {}
}
