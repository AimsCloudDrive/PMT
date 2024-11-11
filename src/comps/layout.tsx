import { Component, ComponentProps } from "@ocean/component";
import { Location } from "./location";

type AppProps = ComponentProps & { routes: any };

export class App extends Component<AppProps> {
  private declare userInfo: {
    user: string;
    token: string;
  };
  declare location: Location;
  constructor(props: AppProps) {
    super(props);
    this.location = new Location({
      url: location.href,
    });
  }

  whatPage() {}

  loginPage() {}

  loadingPage() {}

  renderMenu() {
    return <div></div>;
  }

  mainPage() {
    return (
      <div className={"app-main-page"}>
        <div className={"app-menu"}>{this.renderMenu()}</div>
        // TODO: 分隔线 纵向
        <div className={"app-main-container"}>// TODO: router</div>
      </div>
    );
  }

  render() {
    return this.mainPage();
  }
  componentDidMount(): void {}
}
