import React from "react";

export class Router extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      path: window.location.pathname,
    };
  }

  render() {
    return React.createElement(
      "div",
      { id: "", className: "" },
      React.createElement(
        "nav",
        { id: "nav", className: "nav" },
        React.createElement(
          "button",
          {
            onClick: () => this.changePath({ path: "/home" }),
          },
          "Home"
        ),
        React.createElement(
          "button",
          {
            onClick: () => this.changePath({ path: "/counter" }),
          },
          "Counter"
        ),
        React.createElement(
          "button",
          {
            className: "rigth",
            onClick: () => this.changePath({ path: "/about" }),
          },
          "About"
        )
      ),
      this.findRoute()
    );
  }

  findRoute() {
    switch (this.state.path) {
      case "/counter":
        return <p>Counter</p>;
        break;
      case "/about":
        return <p>About</p>;
        break;
      default:
        return <p>Hello</p>;
    }
  }

  changePath(newState) {
    if (newState.path) window.history.pushState(null, null, newState.path);

    super.setState(newState);
  }
}
