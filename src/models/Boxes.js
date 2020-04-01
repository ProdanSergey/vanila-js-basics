import {range, getRandomHex} from '../helpers';

const INITIAL_VALUE = 3;
const STEP = 10;

class Boxes {
  constructor(container) {
    if (!container) throw new Error('There is no container provided');

    this.container = container;
  } 

  createBoxes(amount) {
    const clone = this.container.cloneNode();
    const nodes = range(amount, INITIAL_VALUE, STEP).map(index => this.createBox(index));
    
    nodes.forEach(node => clone.append(node));

    this.render(clone);
  }

  createBox(index) {    
    const node = document.createElement('div');

    node.classList.add('box');
    
    this.setDimensions(node, index);
    this.setBackground(node);
    this.setLabel(node, index);

    return node;
  }

  setDimensions(node, index) {
    ['height', 'width'].forEach(prop => node.style[prop] = `${index}px`);
  }

  setBackground(node) {
    node.style.backgroundColor = getRandomHex();
  }

  setLabel(node, index) {
    node.style.fontSize = `${index / INITIAL_VALUE}px`;

    node.innerText = `${index}px`;
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