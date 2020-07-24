import { elementFactory, appendChildren } from '../../helpers';

import { Switch } from '../router/Switch';
import { Link } from '../router/Link';
import { routes } from '../../routes';

import { NotFoundPage } from '../../views/NotFoundPage';

import logo from '../../assets/logo.svg';

const LINKS = [
  {
    path: '/builder',
    name: 'Builder',
  },
  {
    path: '/boxes',
    name: 'Boxes',
  },
  {
    path: '/pixels',
    name: 'Pixels',
  },
  {
    path: '/empty',
    name: 'Empty',
  },
];

class App {
  constructor({ title, history }) {
    this.title = title;

    const header = this.renderHeader();
    const main = this.renderMain();

    this.router = new Switch({
      routes,
      history,
      parent: main,
      fallback: NotFoundPage,
    });
    this.components = [header, main];
  }

  renderLogo() {
    const link = new Link('/', void 0, {
      className: 'logo',
      innerText: this.title,
    }).render();

    const image = elementFactory('img', {
      attrs: {
        src: logo,
      },
    });

    return appendChildren(link, image);
  }

  renderListItems() {
    return LINKS.map(({ path, name }) => {
      const item = elementFactory('li', {
        attrs: {
          className: 'navigation-item',
        },
      });

      const link = new Link(path, void 0, {
        className: 'navigation-link',
        innerText: name,
      }).render();

      return appendChildren(item, link);
    });
  }

  renderList() {
    const list = elementFactory('ul', {
      attrs: {
        className: 'navigation-list',
      },
    });

    return appendChildren(list, this.renderListItems());
  }

  renderNavigation() {
    const nav = elementFactory('nav', {
      attrs: {
        className: 'navigation',
      },
    });

    return appendChildren(nav, this.renderList());
  }

  renderHeader() {
    const header = elementFactory('header', {
      attrs: {
        className: 'header',
      },
    });

    const container = appendChildren(
      elementFactory('div', {
        attrs: {
          className: 'grid header-wrapper',
        },
      }),
      this.renderLogo(),
      this.renderNavigation(),
    );

    return appendChildren(header, container);
  }

  renderMain() {
    return elementFactory('main', {
      attrs: {
        className: 'grid content',
      },
    });
  }

  render(root) {
    return appendChildren(root, this.components);
  }
}

export { App };
