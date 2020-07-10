import observe from 'on-change';
import { getPixelsByQuery } from '../api/pixels';
import { Pixel } from './Pixel';

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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadMore(this.state._query);

        observer.unobserve(entry.target);
      }
    });
  };

  async load(query) {
    this.state._query = query;

    if (this.state.pixels.length) {
      this.clear();
    }

    try {
      const { _query: q, _page: p } = this.state;

      this.setLoading(true);

      this.state.pixels = await getPixelsByQuery(q, p);

      this.state._page += 1;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.setLoading(false);
    }
  }

  async loadMore() {
    try {
      const { _query: q, _page: p } = this.state;

      this.setLoading(true);

      this.state.pixels = [
        ...this.state.pixels,
        ...(await getPixelsByQuery(q, p)),
      ];

      this.state._page += 1;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.state._loading = loading;

    this.callbacks.onLoading(loading);
  }

  clear() {
    while (this.container.firstChild) {
      this.container.lastChild.remove();
    }

    this.container.scrollIntoView({
      behavior: 'smooth',
    });

    this.state._page = 1;
  }

  render(pixels) {
    pixels
      .filter((pixel) => !this.state._keys[pixel.id])
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

export { Pixels };
