import { elementFactory, appendChildren } from '../../helpers';

class Page {
  constructor({ title, className, id, children }) {
    this.title = title;
    this.id = id;
    this.className = className;
    this.children = children;
  }

  renderHeader() {
    return elementFactory('header', {
      attrs: {
        innerHTML: elementFactory('h1', {
          attrs: {
            innerText: this.title,
          },
        }).outerHTML,
      },
    });
  }

  render() {
    const section = elementFactory('section', {
      attrs: {
        className: this.className,
        id: this.id,
        innerHTML: this.renderHeader().outerHTML,
      },
    });

    return appendChildren(section, this.children);
  }
}

export { Page };
