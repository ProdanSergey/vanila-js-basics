import observe from 'on-change';
import * as basicLightbox from 'basiclightbox'

import {getPixelsByQuery} from '../api/pixels';

class Pixels {
  constructor(container, callbacks) {
    if (!container) throw new Error('There is no container provided');

    this.container = container;
    
    this.callbacks = {
      onLoading: () => void 0,
      ...callbacks,
    };

    this.observer = new IntersectionObserver(this.onIntersect);

    this.state = observe(
      { 
        pixels: [],
        _keys: {},
        _page: 1,
        _loading: false,
        _query: null,
      }, 
      (_, value) => this.render(value),
      {
        ignoreUnderscores: true,
      },
    );
  }

  onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadMore(this.state._query);

        observer.unobserve(entry.target);
      } 
    });
  }

  async load(query) {
    this.state._query = query;
    
    if (this.state.pixels.length) {
      this.clear();
    }

    try {
      const {_query: query, _page: page} = this.state;

      this.setLoading(true);

      this.state.pixels = await getPixelsByQuery(query, page);
      this.state._page += 1;
    } 
    catch (error) {
      throw new Error(error);
    } 
    finally {
      this.setLoading(false);
    }
  }

  async loadMore() {
    try {
      const {_query: query, _page: page} = this.state;

      this.setLoading(true);

      this.state.pixels = [
        ...this.state.pixels,
        ...await getPixelsByQuery(query, page),
      ];

      this.state._page += 1;
    } 
    catch (error) {
      throw new Error(error);
    } 
    finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.state._loading = loading;
    this.callbacks.onLoading(loading);
  }

  clear() {
    this.container.scrollIntoView({
      behavior: 'smooth'
    });

    while (this.container.firstChild) {
      this.container.lastChild.remove();
    }
  }

  render(pixels) {
    console.log(pixels)
    pixels
      .filter(pixel => !this.state._keys[pixel.id])
      .forEach((pixel, index, arr) => {
        const node = new Pixel(pixel).create();
        
        if (index === arr.length - 1) {
          this.observer.observe(node);
        }

        const key = node.getAttribute('key');

        if (key) {
          this.state._keys[key] = node;
        }

        this.container.append(node);
      });
  }
}

class Pixel {
  constructor(pixel) {
    this.pixel = pixel;
    this.lightbox = null;
  }

  createContainer() {
    return document.createElement('figure');
  }

  createLightbox(image) {
    this.lightbox = basicLightbox.create(image.outerHTML);
  }

  createImage(large) {
    const {webformatURL, largeImageURL, user, tags} = this.pixel;

    const image = document.createElement('img');

    image.src = large ? largeImageURL : webformatURL;
    image.title = `pic from ${user}. ${tags}`;

    return image;
  }

  createToggle() {
    const link = document.createElement('a');

    link.type = 'button';
    
    return link;
  }

  create() {
    const container = this.createContainer();
    const image = this.createImage();
    const largeImage = this.createImage(true);
    const toggle = this.createToggle();

    this.createLightbox(largeImage);

    toggle.append(image);
    toggle.addEventListener('click', this.lightbox.show);

    container.setAttribute('key', this.pixel.id),
    container.append(toggle);

    return container;
  }
}

export { Pixels };