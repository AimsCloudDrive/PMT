import {
  Component,
  ComponentProps,
  ComponentEvents,
  component,
  option,
} from "@ocean/component";
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

export class Location extends Component<LocationProps> {
  @option("string")
  declare url: {};

  @option()
  @observer()
  declare globalParamNames: Array<string>;

  @observer()
  declare params: Record<string, any>;

  @observer()
  declare postParams: Record<string, any>;

  render() {
    return <div className="location"></div>;
  }
  jump(link: string, params?: {}, postParams?: {}, overrideHash?: {}) {}
}
