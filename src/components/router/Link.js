import { history } from '../../history';
import { elementFactory } from '../../helpers';

class Link {
  constructor(path, state, attrs = {}) {
    this.path = process.env.PUBLIC_URL + path;
    this.state = state;
    this.attrs = attrs;
  }

  handleClick = (e) => {
    e.preventDefault();
    history.push(this.path);
  };

  render() {
    return elementFactory('a', {
      attrs: {
        ...this.attrs,
        href: this.path,
      },
      handlers: {
        click: {
          handler: this.handleClick,
        },
      },
    });
  }
}

export { Link };
