import notFoundIcon from '../../assets/404.svg';
import { elementFactory } from '../../helpers';

class NotFound {
  renderFigure() {
    return elementFactory('figure', {
      attrs: {
        className: 'not-found',
        innerHTML: elementFactory('figcaption', {
          attrs: {
            className: 'not-found-caption',
            innerText: "Sorry... we can't find a page",
          },
        }).outerHTML,
      },
    });
  }

  render() {
    const figure = this.renderFigure();

    const image = elementFactory('img', {
      attrs: {
        src: notFoundIcon,
        alt: 'not found',
        className: 'not-found-image',
      },
    });

    figure.append(image);

    return figure;
  }
}

export { NotFound };
