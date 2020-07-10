import { range } from '../helpers/functions';
import { getRandomHex, elementFactory, getInvertedHex } from '../helpers';

const INITIAL_VALUE = 4;
const STEP = 10;
const MAX_BOXES = 20;

class Boxes {
  constructor(container) {
    if (!container) throw new Error('There is no container provided');

    this.container = container;
  }

  createBoxes(amount) {
    if (amount > MAX_BOXES) throw new Error(`Max limit is ${MAX_BOXES} boxes`);

    const clone = this.container.cloneNode();

    const boxes = range(amount, INITIAL_VALUE, STEP).map((index) =>
      this.createBox(index),
    );

    boxes.forEach((box) => clone.append(box));

    this.render(clone);
  }

  createBox(index) {
    const hex = getRandomHex();

    return elementFactory('div', {
      attrs: {
        className: 'box',
        innerText: `${index}px`,
      },
      styles: {
        backgroundColor: hex,
        color: getInvertedHex(hex),
        fontSize: `${index / INITIAL_VALUE}px`,
        width: `${index}px`,
        height: `${index}px`,
      },
    });
  }

  destroy() {
    while (this.container.firstChild) {
      this.container.lastChild.remove();
    }
  }

  render(root) {
    this.container.parentNode.replaceChild(root, this.container);

    this.container = root;
  }
}

export { Boxes };
