class Switch {
  constructor({ parent, routes, history, fallback = null }) {
    this.parent = parent;
    this.routes = routes;
    this.fallback = fallback;

    this.matchRoute(window.location.pathname);

    history.listen(this.handleChange);
  }

  handleChange = ({ location }) => this.matchRoute(location.pathname);

  matchRoute(match) {
    const route = this.routes.find(
      ({ path }) => process.env.PUBLIC_URL + path === match,
    );

    this.renderRoute(route);
  }

  renderComponent(match) {
    if (match) {
      return match?.component?.render();
    }

    return this.fallback?.render();
  }

  renderRoute(route) {
    const component = this.renderComponent(route);

    if (this.parent.childElementCount) {
      component &&
        this.parent.replaceChild(component, this.parent.firstElementChild);
    } else {
      component && this.parent.appendChild(component);
    }
  }
}

export { Switch };
