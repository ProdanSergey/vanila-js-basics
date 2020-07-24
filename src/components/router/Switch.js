class Switch {
  constructor({ parent, routes, history, fallback }) {
    this.parent = parent;
    this.routes = routes;
    this.fallback = fallback;

    this.matchRoute(window.location.pathname);

    history.listen(this.handleChange);
  }

  handleChange = ({ location }) => {
    this.matchRoute(location.pathname);
  };

  matchRoute(predicate) {
    const route = this.routes.find(({ path }) => path === predicate);

    this.renderRoute(route);
  }

  getComponent(match) {
    return match?.component || this.fallback;
  }

  renderRoute(route) {
    const component = this.getComponent(route).render();

    if (this.parent.childElementCount) {
      this.parent.replaceChild(component, this.parent.firstElementChild);
    } else {
      this.parent.appendChild(component);
    }
  }
}

export { Switch };
