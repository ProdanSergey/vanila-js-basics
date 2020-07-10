import invertColor from 'invert-color';
import { safeSet } from './functions';

export const getRandomHex = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .slice(0, 3)}`;

export const getInvertedHex = (hex) => invertColor(hex, true);

export const setElementAttributes = (element, attrs, path) => {
  if (attrs) {
    Object.entries(attrs).forEach(([prop, value]) => {
      safeSet(element, path ? `${path}.${prop}` : prop, value);
    });
  }
};

export const getElementClassNameFromArray = (classList = []) => {
  return classList.reduce((classNames, className) => {
    return className ? `${classNames} ${className}` : classNames;
  }, '');
};

export const elementFactory = (tagName = 'div', { attrs, styles }) => {
  const element = document.createElement(tagName);

  setElementAttributes(element, attrs);
  setElementAttributes(element, styles, 'style');

  return element;
};
