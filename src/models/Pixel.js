import * as basicLightbox from 'basiclightbox';
import { elementFactory } from '../helpers';

import 'basiclightbox/src/styles/main.scss';

class Pixel {
  constructor(pixel) {
    this.pixel = pixel;
    this.container = elementFactory('figure', {
      attrs: {
        key: this.pixel.id,
      },
    });
    this.toggle = elementFactory('a', {
      attrs: {
        type: 'button',
      },
    });
  }

  createLightbox(image) {
    this.lightbox = basicLightbox.create(image.outerHTML);
  }

  createImage(large) {
    const { webformatURL, largeImageURL, user, tags } = this.pixel;

    return elementFactory('img', {
      attrs: {
        src: large ? largeImageURL : webformatURL,
        title: `pic from ${user}. ${tags}`,
      },
    });
  }

  create() {
    const image = this.createImage();
    const largeImage = this.createImage(true);

    this.createLightbox(largeImage);

    this.toggle.append(image);
    this.toggle.addEventListener('click', this.lightbox.show);

    this.container.append(this.toggle);

    return this.container;
  }
}

export { Pixel };
